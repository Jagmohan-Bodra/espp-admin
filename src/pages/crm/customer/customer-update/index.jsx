import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Spin, notification, Empty} from 'antd';

import {
  getCustomerDetail,
  updateCustomer,
  reqIsUpdate,
  postCustomerInternalNote,
} from '~/reduxs/customer/action';
import {updateUser} from '~/reduxs/user/action';
import CustomerForm from '../customer-form';
import DeleteModal from '../customer-delete';
import ROUTE_PATH from '~/routers/path';
import {trans} from '~/components/public/Translate';
import {
  CRM_CUSTOMER_EDIT_PERMISSION_KEY,
  CRM_CUSTOMER_INTERNAL_NOTE_CREATE_PERMISSION_KEY,
  CRM_CUSTOMER_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';

const CustomerUpdate = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const loading = useSelector((state) => state.customer.loading);
  const obj = useSelector((state) => state.customer.obj);
  const isUpdate = useSelector((state) => state.customer.isUpdate);
  const {id} = props.match.params;
  const me = useSelector((state) => state.me.data.data);
  const ACCESS = {
    EDIT: isAccess(CRM_CUSTOMER_EDIT_PERMISSION_KEY),
    VIEW: isAccess(CRM_CUSTOMER_VIEW_PERMISSION_KEY),
    INTERNAL_CREATE: isAccess(CRM_CUSTOMER_INTERNAL_NOTE_CREATE_PERMISSION_KEY),
  };

  useEffect(() => {
    dispatch(getCustomerDetail(id));
  }, []);

  useEffect(() => {
    if (isUpdate) {
      dispatch(reqIsUpdate(false));
    }
  }, [isUpdate]);

  const onDelete = () => {
    setVisible(true);
  };

  const onDiscard = () => {
    props.history.push(ROUTE_PATH.CRM_CUSTOMER);
  };

  const deleteSuccess = () => {
    props.history.push(ROUTE_PATH.CRM_CUSTOMER);
  };

  const onUpdateCustomer = (customerInfo) => {
    ACCESS.EDIT && dispatch(updateCustomer(id, customerInfo));
  };

  const onUpdateUser = (userId, userInfo) => {
    ACCESS.EDIT && dispatch(updateUser(userId, userInfo));
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };

  const handleCreateInternalNote = (data) => {
    if (ACCESS.INTERNAL_CREATE) {
      return postCustomerInternalNote(id, data).then((results) => {
        if (results) {
          notification.success({
            message: trans('Update successful'),
            description: '',
            placement: 'topRight',
          });
          dispatch(getCustomerDetail(id));
          return true;
        }
      });
    }
    !ACCESS.INTERNAL_CREATE &&
      notification.warning({message: trans('Permission denied')});
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <Spin spinning={loading}>
        <CustomerForm
          id={id}
          data={obj}
          onDelete={onDelete}
          onDiscard={onDiscard}
          onUpdateCustomer={onUpdateCustomer}
          onUpdateUser={onUpdateUser}
          handleCreateInternalNote={handleCreateInternalNote}
          me={me}
        />
      </Spin>
      <DeleteModal
        obj={obj}
        visible={visible}
        setVisible={setVisible}
        onFinish={deleteSuccess}
      />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(CustomerUpdate);
