import React, {useState, useEffect} from 'react';
import {Empty, notification} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Spin} from 'antd';
import DeleteModal from '../block-delete';
import {getBlockDetail, updateBlock, reqIsUpdate} from '~/reduxs/block/action';
import BlockForm from '../block-form';
import ROUTE_PATH from '~/routers/path';
import {
  CMS_BLOCK_EDIT_PERMISSION_KEY,
  CMS_BLOCK_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
import {trans} from '~/components/public/Translate';

const BlockUpdate = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const loading = useSelector((state) => state.block.loading);
  const obj = useSelector((state) => state.block.obj);
  const isUpdate = useSelector((state) => state.block.isUpdate);
  const ACCESS = {
    EDIT: isAccess(CMS_BLOCK_EDIT_PERMISSION_KEY),
    VIEW: isAccess(CMS_BLOCK_VIEW_PERMISSION_KEY),
  };
  const {id} = props.match.params;
  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(getBlockDetail(id));
  }, []);

  useEffect(() => {
    setData(obj);
  }, [obj]);

  useEffect(() => {
    if (isUpdate) {
      dispatch(reqIsUpdate(false));
      props.history.push(ROUTE_PATH.CMS_BLOCKS);
    }
  }, [isUpdate]);

  const onDelete = () => {
    setVisible(true);
  };

  const onCancel = () => {
    props.history.push(ROUTE_PATH.CMS_BLOCKS);
  };

  const onSubmit = (dataForm) => {
    setData({...dataForm});
  };

  const onFinish = () => {
    ACCESS.EDIT && dispatch(updateBlock(id, data));
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };

  const deleteSuccess = () => {
    props.history.push(ROUTE_PATH.CMS_BLOCKS);
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <Spin spinning={loading}>
        <BlockForm
          id={id}
          data={obj}
          onDelete={onDelete}
          onCancel={onCancel}
          onSubmit={onSubmit}
          onFinish={onFinish}
        />
      </Spin>
      <DeleteModal
        obj={obj}
        visible={visible}
        setVisible={setVisible}
        onSubmit={onCancel}
        onFinish={deleteSuccess}
      />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(BlockUpdate);
