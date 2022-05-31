import React, {useState, useEffect} from 'react';
import {notification} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {deleteMembership, reqIsDelete} from '~/reduxs/membership/action';
import ComfirmModel from '~/components/public/modals/ComfirmModel';
import {trans} from '~/components/public/Translate';
import {isAccess} from '~/helpers/utils';
import {CRM_MEMBERSHIP_DELETE_PERMISSION_KEY} from '~/constants/permissions';

const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [obj, setObj] = useState({});
  const isDelete = useSelector((state) => state.membership.isDelete);
  const ACCESS = {
    DELETE: isAccess(CRM_MEMBERSHIP_DELETE_PERMISSION_KEY),
  };

  const handleDeleteSubmit = () => {
    dispatch(deleteMembership(obj._id));
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

  return (
    ACCESS.DELETE && (
      <ComfirmModel
        visible={visible}
        setVisible={props.setVisible ? props.setVisible : setVisible}
        header={'Delete'}
        body={
          <>
            Do you want to delete <b>{obj.name || ''}</b>?
          </>
        }
        handleSubmit={handleDeleteSubmit}
      />
    )
  );
};

export default DeleteModal;
