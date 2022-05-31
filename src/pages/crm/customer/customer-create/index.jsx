import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Empty, notification} from 'antd';

import {trans} from '~/components/public/Translate';
import {reqIsCreate, createCustomer} from '~/reduxs/customer/action';
// import { createUser } from '~/reduxs/user/action'
import CustomerForm from '../customer-form';
import PATH from '~/routers/path';
import {isAccess} from '~/helpers/utils';
import {CRM_CUSTOMER_CREATE_PERMISSION_KEY} from '~/constants/permissions';

const CustomerCreate = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.customer.loading);
  const isCreate = useSelector((state) => state.customer.isCreate);
  const ACCESS = {
    CREATE: isAccess(CRM_CUSTOMER_CREATE_PERMISSION_KEY),
  };

  useEffect(() => {
    if (isCreate) {
      dispatch(reqIsCreate(false));
      notification.success({
        message: trans('Create successful'),
        description: '',
        placement: 'topRight',
      });
      props.history.push(PATH.CRM_CUSTOMER);
    }
  }, [isCreate]);

  const onCreate = (user, customer) => {
    dispatch(createCustomer({...customer, ...user}));
    // dispatch(createUser(user, onSucces))
  };

  return ACCESS.CREATE ? (
    <div>
      <CustomerForm loading={loading} onCreate={onCreate} />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(CustomerCreate);
