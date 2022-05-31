import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Spin, notification, Empty} from 'antd';
import {createBlock, reqIsCreate} from '~/reduxs/block/action';
import BlockForm from '../block-form';
import PATH from '~/routers/path';
import {isAccess} from '~/helpers/utils';
import {CMS_BLOCK_CREATE_PERMISSION_KEY} from '~/constants/permissions';

const BlockCreate = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.block.loading);
  const isCreate = useSelector((state) => state.block.isCreate);
  const [data, setData] = useState({});
  const ACCESS = {
    CREATE: isAccess(CMS_BLOCK_CREATE_PERMISSION_KEY),
  };
  useEffect(() => {
    if (isCreate) {
      dispatch(reqIsCreate(false));
      notification.success({
        message: 'Create successful',
        description: '',
        placement: 'topRight',
      });
      props.history.push(PATH.CMS_BLOCKS);
    }
  }, [isCreate]);

  const onCancel = () => {
    props.history.push(PATH.CMS_BLOCKS);
  };

  const onSubmit = (dataForm) => {
    setData({...dataForm});
  };

  const onFinish = () => {
    data.styles = {};
    dispatch(createBlock(data));
  };

  const onDiscard = () => {
    props.history.push(PATH.CMS_BLOCKS);
  };

  return ACCESS.CREATE ? (
    <div>
      <Spin spinning={loading}>
        <BlockForm
          onCancel={onCancel}
          onSubmit={onSubmit}
          onFinish={onFinish}
          onDiscard={onDiscard}
          isCreate={true}
        />
      </Spin>
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(BlockCreate);
