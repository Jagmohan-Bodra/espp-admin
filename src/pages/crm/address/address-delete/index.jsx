import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAddress, reqIsDelete} from '~/reduxs/address/action';
import ComfirmModel from '~/components/public/modals/ComfirmModel';

const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [obj, setObj] = useState({});
  const isDelete = useSelector((state) => state.address.isDelete);
  // const ACCESS = {
  //   DELETE: isAccess(CRM_CUSTOMER_DELETE_PERMISSION_KEY),
  // };

  const handleDeleteSubmit = () => {
    dispatch(deleteAddress(obj._id));
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
      //  alertDeleteSuccessful();
      props.onFinish && props.onFinish();
    }
  }, [isDelete]);

  return (
    // ACCESS.DELETE && (
    <ComfirmModel
      visible={visible}
      setVisible={props.setVisible ? props.setVisible : setVisible}
      header={'Delete'}
      body={
        <>
          Do you want to delete{' '}
          <b>
            {obj.firstName || ''} {obj.lastName || ''}
          </b>
          ?
        </>
      }
      handleSubmit={handleDeleteSubmit}
    />
  );
  //);
};

export default DeleteModal;
