import React, {useState, useEffect} from 'react';
import {notification} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCategory, reqIsDelete} from '~/reduxs/category/action';
import ComfirmModel from '~/components/public/modals/ComfirmModel';
import {trans} from '~/components/public/Translate';
import {INVENTORY_PRODUCT_CATEGORY_DELETE_PERMISSION_KEY} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';

const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [obj, setObj] = useState({});
  const isDelete = useSelector((state) => state.category.isDelete);
  const ACCESS = {
    DELETE: isAccess(INVENTORY_PRODUCT_CATEGORY_DELETE_PERMISSION_KEY),
  };

  const handleDeleteSubmit = () => {
    dispatch(deleteCategory(obj._id));
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
        body={<>Do you want to delete {obj.name || ''}?</>}
        handleSubmit={handleDeleteSubmit}
      />
    )
  );
};

export default DeleteModal;
