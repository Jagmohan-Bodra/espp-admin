import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Breadcrumb from '~/components/public/Breadcrumb';
import {ButtonGray} from '~/components/public/Button';
import {Toolbox} from '~/components/public/Toolbox';
import {
  getQueryString,
  getQueryBuilder,
  stringify,
  getPageFilter,
  changeUrlQuery,
  getSortFilter,
} from '~/helpers/queryString';
import SwitchButton, {
  ListSwitchBtn,
  TabsSwitchBtn,
} from '~/components/public/screen-switch-button';
import KanbanTab from './KanbanTab';
import TableTab from './TableTab';
import {getOrdersList, getOrdersListExport} from '~/reduxs/orders/action';
import {META_DATA} from '~/config';
import {exportExcel} from '~/helpers/ExportExcel';
import '../../style.scss';
import QuickFilterDropdown, {
  TYPE,
} from '~/components/public/quick-filter-dropdown';
import {ORDERS_STATUS_OPTION} from '~/constants/master-data';
import {getMembershipList} from '~/reduxs/membership/action';
import qs from 'qs';

import {ORDERS_STATUS} from '~/constants/master-data';
import {formatDateTimeDefault} from '~/helpers/date';
import {
  SALE_ORDER_CREATE_PERMISSION_KEY,
  SALE_ORDER_DELETE_PERMISSION_KEY,
  SALE_ORDER_EDIT_PERMISSION_KEY,
  SALE_ORDER_PERMISSION_KEY,
  SALE_ORDER_VIEW_PERMISSION_KEY,
  CRM_MEMBERSHIP_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
import {Empty} from 'antd';
import {isEmpty} from 'validate.js';
const {PAGE_SIZE} = META_DATA.PAGINATION;
const cssClass = 'orders-list-page';
const TABS = {
  TAB: 'KANBAN_TAB',
  TABLE: 'TABLE_TAB',
};
const SELECT_BUTTON = {
  [TABS.TAB]: 0,
  [TABS.TABLE]: 1,
};
const OrdersList = (props) => {
  const query = getQueryString(props);
  const dispatch = useDispatch();
  const memberships = useSelector((state) => state.membership.data);
  const [tab, setTab] = useState(query.key || TABS.TAB);
  const data = useSelector((state) => state.orders.data);
  const meta = useSelector((state) => state.orders.metadata);
  const loading = useSelector((state) => state.orders.loading);
  const queryBuilder = getQueryBuilder(query) || {};
  const searchUrl = qs.parse(props.location.search, {ignoreQueryPrefix: true});
  const ACCESS = {
    LIST: isAccess(SALE_ORDER_PERMISSION_KEY),
    VIEW: isAccess(SALE_ORDER_VIEW_PERMISSION_KEY),
    CREATE: isAccess(SALE_ORDER_CREATE_PERMISSION_KEY),
    EDIT: isAccess(SALE_ORDER_EDIT_PERMISSION_KEY),
    DELETE: isAccess(SALE_ORDER_DELETE_PERMISSION_KEY),
    FILTER: isAccess(CRM_MEMBERSHIP_PERMISSION_KEY),
  };

  useEffect(() => {
    const {key} = searchUrl;
    if (key) {
      setTab(key);
    }
    ACCESS.FILTER &&
      dispatch(getMembershipList({meta: {pageSize: 1000, page: 1}}));
  }, []);

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    delete queryBuilder.reset;

    dispatch(
      getOrdersList({
        meta: {pageSize: 1000, page: 1},
        ...queryBuilder,
        active: isEmpty(queryBuilder.active)
          ? {nequal: 0}
          : queryBuilder.active,
      }),
    );
  }, [query]);

  const onTabClick = (key) => {
    setTab(key);
    setFilterQueryData({
      ...getPageFilter(1, key === TABS.TAB ? true : false),
      key: key,
    });
  };

  const setFilterQueryData = (value = {}) => {
    const queryBuilder = getQueryBuilder(query) || {};
    const data = {
      ...queryBuilder,
      ...value,
      meta: {
        ...(queryBuilder.meta || {}),
        ...(value.meta || {}),
      },
      reset: !(queryBuilder.reset === 'true'),
    };
    const queryParam = stringify(data);
    changeUrlQuery(props, queryParam);
  };

  const onSortChange = (sort) => {
    setFilterQueryData({
      ...getSortFilter(sort),
    });
  };

  const onPageChange = (page) => {
    setFilterQueryData({
      ...getPageFilter(page),
    });
  };

  const handleSearchSubmit = (params) => {
    let newParam = {...params};
    newParam.user = {};
    if (params.firstName) {
      newParam.user.firstName = params.firstName;
      delete newParam.firstName;
    }
    if (params.lastName) {
      newParam.user.lastName = params.lastName;
      delete newParam.lastName;
    }
    if (params.email) {
      newParam.user.email = params.email;
      delete newParam.email;
    }
    setFilterQueryData({
      ...newParam,
      meta: {page: '1'},
    });
  };

  const exportToCSV = async () => {
    let queryBuilder = getQueryBuilder(query) || {};
    queryBuilder.meta = {
      ...queryBuilder.meta,
      ...{sort: ['-_id']},
      pageSize: 1000,
    };
    delete queryBuilder.reset;
    await getOrdersListExport({...queryBuilder}).then((dataEx) => {
      if (dataEx) {
        let dataExport = (dataEx.data || []).reduce((total, item) => {
          let customer = item.customer || {};
          let newTotal = total.concat([
            {
              'Order No.': item.orderNo,
              'Order Date Time': formatDateTimeDefault(item.orderDateTime),
              'Customer Name':
                (customer.user && customer.user.firstName) +
                ' ' +
                (customer.user && customer.user.lastName),
              'Customer Email': customer.user && customer.user.email,
              Membership: item.membership && item.membership.name,
              'Amount (SGD)': item.amount,
              'Payment Option': item.payment,
              'Shipping Location': item.shippingLocation,
              Status: ORDERS_STATUS[item.status],
            },
          ]);
          return newTotal;
        }, []);

        exportExcel('Espp_table_orders', dataExport, 'orders');
      }
    });
  };

  const renderTabContent = (tab) => {
    switch (tab) {
      case 'KANBAN_TAB':
        return (
          <KanbanTab
            isEdit={ACCESS.EDIT}
            isDelete={ACCESS.DELETE}
            isView={ACCESS.VIEW}
            setFilterQueryData={setFilterQueryData}
          />
        );
      case 'TABLE_TAB':
        return (
          <TableTab
            data={data}
            meta={meta}
            loading={loading}
            pageSize={PAGE_SIZE}
            onPageChange={onPageChange}
            onSortChange={onSortChange}
            sortFilter={(queryBuilder.meta || {}).sort || []}
            isEdit={ACCESS.EDIT}
            isDelete={ACCESS.DELETE}
            isView={ACCESS.VIEW}
          />
        );
    }
  };

  return ACCESS.LIST ? (
    <div className={`${cssClass}`}>
      <Breadcrumb data={[{name: 'Orders', link: '#'}]} />
      <Toolbox className={cssClass}>
        <div className={`${cssClass}__button-left`}>
          <QuickFilterDropdown
            dataFilter={{...queryBuilder, ...(queryBuilder.user || {})}}
            handleSearchSubmit={handleSearchSubmit}
            options={[
              {
                key: 'orderNo',
                text: 'Order no',
                type: TYPE.INPUT,
              },
              {
                key: 'firstName',
                text: 'First name',
                type: TYPE.INPUT,
              },
              {
                key: 'lastName',
                text: 'Last name',
                type: TYPE.INPUT,
              },
              {
                key: 'email',
                text: 'Customer email',
                type: TYPE.INPUT,
              },
              ACCESS.FILTER && {
                key: 'membership',
                text: 'Membership',
                type: TYPE.SELECT,
                options: (memberships || []).map((item) => ({
                  key: item._id,
                  name: item.name,
                })),
              },
              {
                key: 'shippingLocation',
                text: 'Shipping location',
                type: TYPE.INPUT,
              },
              {
                key: 'payment',
                text: 'Payment option',
                type: TYPE.INPUT,
              },
              {
                key: 'status',
                text: 'Status',
                type: TYPE.SELECT,
                options: ORDERS_STATUS_OPTION,
              },
              {
                key: 'orderDateTime',
                text: 'Order date time',
                type: TYPE.DATE_RANGE,
              },
              {
                key: 'active',
                text: 'Archived',
                type: TYPE.SELECT,
                // options: (memberships || []).map((item) => ({
                //   key: item._id,
                //   name: item.name,
                // })),
                options: [{key: '0', name: 'Archived'}],
              },
            ].filter((item) => item)}
          />
        </div>
        <ButtonGray
          style={{marginRight: '50px'}}
          text="Export to CSV"
          onClick={exportToCSV}
        />
        <SwitchButton
          cssClassProps={cssClass}
          itemSwitchBtns={[
            (btnProps) => (
              <TabsSwitchBtn
                {...btnProps}
                onClick={() => {
                  onTabClick(TABS.TAB);
                }}
              />
            ),
            (btnProps) => (
              <ListSwitchBtn
                {...btnProps}
                onClick={() => {
                  onTabClick(TABS.TABLE);
                }}
              />
            ),
          ]}
          select={SELECT_BUTTON[tab]}
        />
      </Toolbox>
      <div className={`${cssClass}_body`}>{renderTabContent(tab)}</div>
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(OrdersList);
