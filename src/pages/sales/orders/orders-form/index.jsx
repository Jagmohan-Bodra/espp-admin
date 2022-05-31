import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Spin, Dropdown, Menu, Button, Select, Space} from 'antd';
import qs from 'qs';

import {Toolbox} from '~/components/public/Toolbox';
import {ButtonGray} from '~/components/public/Button';
import {RowAuto, ColAuto} from '~/components/public/Grid';
import {FromCard} from '~/components/public/FormHelpers';
import Breadcrumb from '~/components/public/Breadcrumb';
import TableBillingInformation from './TableBillingInformation';
import OrdersDetail from './TableOrdersDetail/index';
import TablePaymentMethod from './TablePaymentMethod';
import {stringify, changeUrlQuery} from '~/helpers/queryString';
import {DownOutlined} from '@ant-design/icons';
import {ORDERS_STATUS_OPTION} from '~/constants/master-data';
import '../../style.scss';
import {FaArchiveIcon} from '~/public/assets/icon';
const cssClass = 'sales-orders-form';
const {Option} = Select;
const OrdersForm = (props) => {
  const [tab, setTab] = useState('ORDERS_INFORMATION');
  const [data, setData] = useState(props.data || {});
  const searchUrl = qs.parse(props.location.search, {ignoreQueryPrefix: true});
  const {id} = props.match.params;

  useEffect(() => {
    const {activeTab} = searchUrl;
    if (activeTab) {
      setTab(activeTab);
    }
  }, []);

  useEffect(() => {
    setData({...props.data});
  }, [props.data]);

  const onTabClick = (key) => {
    setTab(key);
    let queryParam = stringify({activeTab: key});
    changeUrlQuery(props, queryParam);
  };

  const renderTabContent = (tab, data) => {
    switch (tab) {
      case 'ORDERS_INFORMATION':
        return <TableBillingInformation data={data} />;
      case 'ORDERS_DETAIL':
        return <OrdersDetail data={data} loading={props.loading} />;
      case 'ORDERS_PAYMENT_METHOD':
        return <TablePaymentMethod data={data} />;
    }
  };

  const handleChange = (value) => {
    props.onSave && props.onSave({status: value});
  };

  const onActionItem = (e) => {
    props.onActionKey && props.onActionKey(e.key, e);
  };

  const {active} = data || {};
  return (
    <div className={`${cssClass}`}>
      <div className={`${cssClass}_breadcrumb`}>
        <Breadcrumb data={getBreadcrumb(id, data)} />
        <div className={`${cssClass}_breadcrumb_btn`}>
          <button
            className={`btn-status ${active ? 'btn-active' : 'btn-archive'}`}
            onClick={() => props.onSave && props.onSave({active: !active})}>
            <Space>
              <FaArchiveIcon />
              {active && <div className={'active'}>Active</div>}
              {!active && <div className={'archive'}>Archive</div>}
            </Space>
          </button>
        </div>
      </div>
      <Toolbox className={cssClass}>
        <div className={`${cssClass}__order_status`}>
          <span style={{marginRight: '10px', color: '#4B5B79'}}>
            Order Status
          </span>
          <Select
            style={{width: 'auto'}}
            className={`${cssClass}__order_status_select`}
            value={data.status}
            onChange={handleChange}>
            {ORDERS_STATUS_OPTION.map((item, index) => (
              <Option key={index} value={item.key}>
                {item.value}
              </Option>
            ))}
          </Select>
        </div>
        <Dropdown
          overlay={
            <Menu onClick={onActionItem}>
              <Menu.ItemGroup title="Print">
                <Menu.Item key="PRINT_ORDER_SLIP">Order Slip</Menu.Item>
                <Menu.Item key="PRINT_INVOICE">Invoice</Menu.Item>
                <Menu.Item key="PRINT_RECEIPT">Receipt</Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Email Customers">
                <Menu.Item key="EMAIL_INVOICE">Invoice</Menu.Item>
                <Menu.Item key="EMAIL_RECEIPT">Receipt</Menu.Item>
                <Menu.Item key="EMAIL_SHIPPING_DETAILS">
                  Shipping Details
                </Menu.Item>
              </Menu.ItemGroup>
            </Menu>
          }>
          <Button className={`${cssClass}__button-dropdown`}>
            Action <DownOutlined />
          </Button>
        </Dropdown>
        <div style={{marginLeft: '200px'}} />
      </Toolbox>

      <FromCard>
        <RowAuto>
          <ColAuto desktop={4} className={`${cssClass}__col-left`}>
            {TABS &&
              TABS.map((item) => (
                <ButtonGray
                  key={item.key}
                  onClick={() => onTabClick(item.key)}
                  className={`${cssClass}__button ${
                    item.key == tab ? 'active' : ''
                  }`}
                  text={item.value}
                  disabled={!id ? true : false}
                />
              ))}
          </ColAuto>
          <ColAuto desktop={20} className={`${cssClass}__col-right`}>
            <Spin spinning={props.loading}>{renderTabContent(tab, data)}</Spin>
          </ColAuto>
        </RowAuto>
      </FromCard>
    </div>
  );
};

export default withRouter(OrdersForm);

const getBreadcrumb = (id, data) => {
  let {orderNo} = data || {};
  let nameOrders = id ? orderNo : 'Create';
  return [{name: 'Orders'}, {name: nameOrders, link: '#'}];
};

const TABS = [
  {
    key: 'ORDERS_INFORMATION',
    value: 'Billing Information',
  },
  {
    key: 'ORDERS_DETAIL',
    value: 'Order Details',
  },
  {
    key: 'ORDERS_PAYMENT_METHOD',
    value: 'Payment Method',
  },
];
