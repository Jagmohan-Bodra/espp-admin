import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import qs from 'qs';
import {DownOutlined} from '@ant-design/icons';
import {Dropdown, Menu, Button} from 'antd';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonGray} from '~/components/public/Button';
import {RowAuto, ColAuto} from '~/components/public/Grid';
import {FromCard} from '~/components/public/FormHelpers';
import Breadcrumb from '~/components/public/Breadcrumb';
import TabCustomerDetail from './TabCustomerDetail';
import CustomerAddresses from '~/pages/crm/address/address-list';
import TabCompany from './TabCompany';
import TabFinance from './TabFinance';
import TabInternalNotes from './TabInternalNotes';
import TabOrderHistory from './TabOrderHistory';
import TabPromotionCoupon from './TabPromotionCoupon';
import {getMembershipList} from '~/reduxs/membership/action';
import {debounce} from '~/helpers/common';

import {stringify, changeUrlQuery} from '~/helpers/queryString';
import PATH from '~/routers/path';
import {TABS} from './data';
import '../style.scss';
import {subspendCustomer} from '~/reduxs/customer/action';
import {isAccess} from '~/helpers/utils';
import {
  CRM_CUSTOMER_DELETE_PERMISSION_KEY,
  CRM_CUSTOMER_EDIT_PERMISSION_KEY,
  CRM_CUSTOMER_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
const cssClass = 'crm-customer-form';

const funcUpdateUser = debounce(
  async (onUpdateUser, userId, value, handleAlertStatus) => {
    if (onUpdateUser) {
      const isUpdated = await onUpdateUser(userId, value);
      handleAlertStatus(value, isUpdated);
    }
  },
  1000,
);

const funcUpdateCustomer = debounce(
  async (onUpdateCustomer, value, handleAlertStatus) => {
    if (onUpdateCustomer) {
      const isUpdated = await onUpdateCustomer(value);
      handleAlertStatus(value, isUpdated);
    }
  },
  1000,
);

const CustomerForm = (props) => {
  const dispatch = useDispatch();
  const memberships = useSelector((state) => state.membership.data);
  const [tab, setTab] = useState('GENERAL_INFORMATION');
  const [customer, setCustomer] = useState({});
  const [user, setUser] = useState({});
  const [editField, setEditField] = useState('');
  const [editFieldFalse, setEditFieldFalse] = useState('');
  const searchUrl = qs.parse(props.location.search, {ignoreQueryPrefix: true});
  const {id} = props.match.params;
  const ACCESS = {
    VIEW: isAccess(CRM_CUSTOMER_VIEW_PERMISSION_KEY),
    EDIT: isAccess(CRM_CUSTOMER_EDIT_PERMISSION_KEY),
    DELETE: isAccess(CRM_CUSTOMER_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    setCustomer({
      ...props.data,
      customerGroupName: ((props.data || {}).customerGroup || {}).name,
      customerGroup: ((props.data || {}).customerGroup || {})._id,
      membership: ((props.data || {}).membership || {})._id,
    });
    setUser((props.data || {}).user || {});
  }, [props.data]);

  useEffect(() => {
    dispatch(getMembershipList());
    const {activeTab} = searchUrl;
    if (activeTab) {
      setTab(activeTab);
    }
  }, []);

  const onTabClick = (key) => {
    setTab(key);
    let queryParam = stringify({activeTab: key});
    changeUrlQuery(props, queryParam);
  };

  const handleAlertStatus = (obj, isSuccess = true) => {
    const fields = Object.keys(obj);
    isSuccess && setEditField(fields[0]);
    !isSuccess && setEditFieldFalse(fields[0]);
    setTimeout(() => {
      setEditField('');
      setEditFieldFalse('');
    }, 3500);
  };

  const onChangeUser = (val) => {
    if (!id) {
      setUser({...user, ...val});
    }
    if (id) {
      setUser({...user, ...val});
      funcUpdateUser(props.onUpdateUser, user._id, val, handleAlertStatus);
    }
  };

  const onChangeCustomer = (value) => {
    if (!id) {
      setCustomer({...customer, ...value});
    }
    if (id) {
      setCustomer({...customer, ...value});
      funcUpdateCustomer(props.onUpdateCustomer, value, handleAlertStatus);
    }
  };
  const handleAction = (e) => {
    if (e.key === 'item_0') {
      return;
    }
    dispatch(subspendCustomer(id));
  };
  const renderTabContent = () => {
    switch (tab) {
      case 'GENERAL_INFORMATION':
        return (
          <TabCustomerDetail
            customer={customer}
            user={user}
            memberships={memberships}
            onCreate={() => props.onCreate(user, customer)}
            onChangeUser={onChangeUser}
            onChangeCustomer={onChangeCustomer}
            editField={editField}
            editFieldFalse={editFieldFalse}
          />
        );
      case 'ADDRESS':
        return <CustomerAddresses customerInfo={props.data || {}} />;
      case 'COMPANY_INFORMATION':
        return (
          <TabCompany
            customer={customer}
            onChangeCustomer={onChangeCustomer}
            editField={editField}
            editFieldFalse={editFieldFalse}
          />
        );
      case 'FINANCE':
        return (
          <TabFinance
            customer={customer}
            onChangeCustomer={onChangeCustomer}
            editField={editField}
            editFieldFalse={editFieldFalse}
          />
        );
      case 'ORDER_HISTORY':
        return (
          <TabOrderHistory
            orderHistory={customer.orderHistory || []}
            user={user}
          />
        );
      case 'INTERNAL_NOTES':
        return (
          <TabInternalNotes
            customer={customer}
            internalNote={customer.internalNote || []}
            user={props.me}
            handleCreateInternalNote={props.handleCreateInternalNote}
          />
        );
      case 'PROMOTION_COUPON':
        return (
          <TabPromotionCoupon
            promotionCoupon={customer.promotionCoupon || []}
            user={user}
          />
        );
    }
  };

  return (
    <div className={`${cssClass}`}>
      <Breadcrumb data={getBreadcrumb(id, customer.user || {})} />
      <Toolbox className={cssClass}>
        {id && (
          <>
            {ACCESS.DELETE && ' '}
            <Dropdown
              overlay={
                <Menu onClick={handleAction}>
                  <Menu.Item>Login as Customer</Menu.Item>
                  <Menu.Item>Suspend Customer</Menu.Item>
                  <Menu.Item>Send Email Notification</Menu.Item>
                </Menu>
              }>
              <Button className={`${cssClass}__button-dropdown`}>
                Action <DownOutlined />
              </Button>
            </Dropdown>
            <div style={{marginLeft: '80px'}} />
          </>
        )}
      </Toolbox>

      <FromCard>
        <RowAuto>
          <ColAuto desktop={5} className={`${cssClass}__col-left`}>
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
          <ColAuto desktop={19} className={`${cssClass}__col-right`}>
            {renderTabContent()}
          </ColAuto>
        </RowAuto>
      </FromCard>
    </div>
  );
};

export default withRouter(CustomerForm);

const getBreadcrumb = (id, user) => {
  let {firstName, lastName} = user || {};
  let fullName = firstName + ' ' + lastName;
  let nameBread = id ? fullName : 'Create';
  return [
    {name: 'Customers', link: PATH.CRM_CUSTOMER},
    {name: nameBread, link: '#'},
  ];
};
