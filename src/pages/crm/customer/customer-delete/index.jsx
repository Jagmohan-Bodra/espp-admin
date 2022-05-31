import React, {useState, useEffect} from 'react';
import {notification} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCustomer, reqIsDelete} from '~/reduxs/customer/action';
import ComfirmModel from '~/components/public/modals/ComfirmModel';
import {trans} from '~/components/public/Translate';
import {CRM_CUSTOMER_DELETE_PERMISSION_KEY} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';

const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [obj, setObj] = useState({});
  const isDelete = useSelector((state) => state.customer.isDelete);
  const ACCESS = {
    DELETE: isAccess(CRM_CUSTOMER_DELETE_PERMISSION_KEY),
  };
  const handleDeleteSubmit = () => {
    dispatch(deleteCustomer(obj._id));
  };

  useEffect(() => {
    setObj(props.obj || {});
  }, [props.obj]);

  useEffect(() => {
    setVisible(props.visible || false);
  }, [props.visible]);

  useEffect(() => {
    if (isDelete) {
      dispatch(reqIsDelete(false));
      notification.success({
        message: trans('Delete successful'),
        description: '',
        placement: 'topRight',
      });
      props.onFinish && props.onFinish();
    }
  }, [isDelete]);

  const {user} = obj;
  const {firstName, lastName} = user || {};
  const fullName = firstName + ' ' + lastName;
  return (
    ACCESS.DELETE && (
      <ComfirmModel
        visible={visible}
        setVisible={props.setVisible ? props.setVisible : setVisible}
        header={'Delete'}
        body={
          <>
            Do you want to delete <b>{fullName}</b>?
          </>
        }
        handleSubmit={handleDeleteSubmit}
      />
    )
  );
};

export default DeleteModal;
