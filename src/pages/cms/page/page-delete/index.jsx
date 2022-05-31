import React, {useState, useEffect} from 'react';
import {notification} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import ComfirmModel from '~/components/public/modals/ComfirmModel';
import {trans} from '~/components/public/Translate';
import {deletePage, getPageList, reqIsDelete} from '~/reduxs/page/action';
import {isAccess} from '~/helpers/utils';
import {CMS_PAGE_DELETE_PERMISSION_KEY} from '~/constants/permissions';

const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [obj, setObj] = useState({});
  const isDelete = useSelector((state) => state.page.isDelete);
  const ACCESS = {
    DELETE: isAccess(CMS_PAGE_DELETE_PERMISSION_KEY),
  };

  const handleDeleteSubmit = () => {
    dispatch(deletePage(obj._id || props.id));
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
      dispatch(getPageList());
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
            Do you want to delete {obj.id || ''} {obj.name || ''}?
          </>
        }
        handleSubmit={handleDeleteSubmit}
      />
    )
  );
};

export default DeleteModal;
