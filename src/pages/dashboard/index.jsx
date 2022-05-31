import {Empty} from 'antd';
import React, {useEffect, useState} from 'react';
import Breadcrumb from '~/components/public/Breadcrumb';
import {Toolbox} from '~/components/public/Toolbox';
import {DASHBOARD_PERMISSION_KEY} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
import QuickFilterDropdown from '~/components/public/quick-filter-dropdown';
import './style.scss';
import CountCard from './CountCard';
import OverviewChart from './OverviewChart';
import ProgressCard from './ProgressCard';
import orders from '~/apis/api/orders';
import {CUSTOMER_STATUS_NEW, ORDERS_STATUS} from '~/constants/master-data';
import customer from '~/apis/api/customer';
import {getThisMonth} from '~/helpers/date';
import product from '~/apis/api/product';
import {NewCustomerIcon, OrderIcon, ProductIcon} from '~/public/assets/icon';

const breadcrumbs = [
  {
    name: 'Dashboard',
    link: '#',
  },
];

const getPercentInArr = (data = [1], value) =>
  (
    (parseFloat(value) / (data.reduce((total, item) => total + item, 0) || 1)) *
    100
  ).toFixed(2);

const DashboardPage = () => {
  const [dataOrder, setDataOrder] = useState({});
  const [dataCustomer, setDateCustomer] = useState({});
  const [dataProduct, setDataProduct] = useState({});

  useEffect(() => {
    orders
      .getOrdersStatistical({createdAt: {inMonthOfYear: getThisMonth()}})
      .then((results) => setDataOrder(results.data));

    customer
      .getCustomerStatistical()
      .then((results) => setDateCustomer(results.data));

    product
      .getProductsStatistical()
      .then((results) => setDataProduct(results.data));
  }, []);

  const ACCESS = {
    VIEW: isAccess(DASHBOARD_PERMISSION_KEY),
  };
  return ACCESS.VIEW ? (
    <div className="dashboard-page">
      <Breadcrumb data={breadcrumbs} />
      <Toolbox>
        <QuickFilterDropdown
          dataFilter={{}}
          handleSearchSubmit={() => {}}
          options={[]}
          className={`dashboard-page_filter`}
        />
      </Toolbox>
      <div className="dashboard-page_count_card">
        <CountCard
          icon={<OrderIcon />}
          title={'New Orders'}
          count={dataOrder.this_month}
        />
        <CountCard
          icon={<NewCustomerIcon />}
          title={'New Customers'}
          count={dataCustomer.this_month}
        />
        <CountCard
          icon={<ProductIcon />}
          title={'Product'}
          count={dataProduct.count}
        />
      </div>

      <div className={`dashboard-page_body`}>
        <div className={`dashboard-page_body_left`}>
          <OverviewChart
            title={`Order Overview`}
            data={[
              {
                label: 'Pending',
                color: '#ff544d',
                value: dataOrder[ORDERS_STATUS.PENDING],
              },
              {
                label: 'Processing',
                color: '#ff8d39',
                value: dataOrder[ORDERS_STATUS.PROCESSING],
              },
              {
                label: 'Cancel',
                color: '#41b6ff',
                value: dataOrder[ORDERS_STATUS.CANCELLED],
              },
              {
                label: 'Shipped',
                color: '#4fd125',
                value: dataOrder[ORDERS_STATUS.READY_TO_SHIP],
              },
              {
                label: 'Completed',
                color: '#a060fc',
                value: dataOrder[ORDERS_STATUS.COMPLETED],
              },
            ]}
          />
          <ProgressCard
            text={`Today's New Orders`}
            value={dataOrder.today}
            percent={100}
            color={`#ff842b`}
          />
          <ProgressCard
            text={`Today’s Pending Orders`}
            value={dataOrder.today_pending}
            percent={getPercentInArr(
              [dataOrder.today],
              dataOrder.today_pending,
            )}
            color={`#39b3ff`}
          />
          <ProgressCard
            text={`Yesterday’s Orders`}
            value={dataOrder.yesterday}
            percent={100}
            color={`#a060ff`}
          />
          <ProgressCard
            text={`Yesterday’s Pending Orders`}
            value={dataOrder.yesterday_pending}
            percent={getPercentInArr(
              [dataOrder.yesterday],
              dataOrder.yesterday_pending,
            )}
            color={`#d19a1f`}
          />
          <ProgressCard
            text={`Total Orders This Month`}
            value={dataOrder.this_month}
            percent={100}
            color={`#fd398c`}
          />
          <ProgressCard
            text={`Total Completed Orders This Month`}
            value={dataOrder.this_month_completed}
            percent={getPercentInArr(
              [dataOrder.this_month],
              dataOrder.this_month_completed,
            )}
            color={`#4fd125`}
          />
        </div>
        <div className={`dashboard-page_body_right`}>
          <OverviewChart
            title={`Customer Overview`}
            data={[
              {
                label: 'Active',
                color: '#ff544d',
                value: dataCustomer[CUSTOMER_STATUS_NEW.ACTIVE],
              },
              {
                label: 'Suspended',
                color: '#41b6ff',
                value: dataCustomer[CUSTOMER_STATUS_NEW.SUSPEND],
              },
              {
                label: 'Pending',
                color: '#4fd125',
                value: dataCustomer[CUSTOMER_STATUS_NEW.PENDING],
              },
            ]}
          />
          <ProgressCard
            text={`Total New Customers This Month`}
            value={dataCustomer.this_month}
            percent={getPercentInArr(
              [dataCustomer.total],
              dataCustomer.this_month,
            )}
            color={`#4fd125`}
          />
          <ProgressCard
            text={`Total Active Customers`}
            value={dataCustomer.total_actice}
            percent={getPercentInArr(
              [dataCustomer.total],
              dataCustomer.total_actice,
            )}
            color={`#39b3ff`}
          />
          <ProgressCard
            text={`Total Suspended Customers`}
            value={dataCustomer.total_subpended}
            percent={getPercentInArr(
              [dataCustomer.total],
              dataCustomer.total_subpended,
            )}
            color={`#fd544d`}
          />
        </div>
      </div>
    </div>
  ) : (
    <Empty />
  );
};

export default DashboardPage;
