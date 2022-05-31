import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Empty, notification, Spin} from 'antd';
import {isEmpty} from 'lodash';

import {trans} from '~/components/public/Translate';
import {uploadImageData} from '~/reduxs/upload/action';
import {createPost, reqIsCreate} from '~/reduxs/post/action';
import PostForm from '../post-form';
import PATH from '~/routers/path';
import {isAccess} from '~/helpers/utils';
import {CMS_POST_CREATE_PERMISSION_KEY} from '~/constants/permissions';

const UserCreate = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.post.loading);
  const isCreate = useSelector((state) => state.post.isCreate);
  const [data, setData] = useState({});
  const ACCESS = {
    CREATE: isAccess(CMS_POST_CREATE_PERMISSION_KEY),
  };
  useEffect(() => {
    if (isCreate) {
      dispatch(reqIsCreate(false));
      notification.success({
        message: trans('Create successful'),
        description: '',
        placement: 'topRight',
      });
      props.history.push(PATH.CMS_POSTS);
    }
  }, [isCreate]);

  const onCancel = () => {
    props.history.push(PATH.CMS_POSTS);
  };

  const onSubmit = (dataForm) => {
    setData({...dataForm});
  };

  const onFinish = async () => {
    if (!isEmpty(data.fileImage)) {
      data.avatar = await dispatch(uploadImageData([data.fileImage]));
    }
    dispatch(createPost(data));
  };

  return ACCESS.CREATE ? (
    <div>
      <Spin spinning={loading}>
        <PostForm
          onCancel={onCancel}
          onSubmit={onSubmit}
          onFinish={onFinish}
          isCreate={true}
          isView={false}
        />
      </Spin>
    </div>
  ) : (
    <Empty />
  );
};

export default UserCreate;
