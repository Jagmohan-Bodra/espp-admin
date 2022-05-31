import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Empty, notification, Spin} from 'antd';
import {isEmpty} from 'lodash';
import {trans} from '~/components/public/Translate';
import {uploadImageData} from '~/reduxs/upload/action';
import CategoryForm from '../category-form';
import PATH from '~/routers/path';
import {createPostCategory, reqIsCreate} from '~/reduxs/post-category/action';
import {isAccess} from '~/helpers/utils';
import {CMS_POST_CATEGORY_CREATE_PERMISSION_KEY} from '~/constants/permissions';

const CategoryCreatePage = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.postCategory.loading);
  const isCreate = useSelector((state) => state.postCategory.isCreate);
  const [data, setData] = useState({});
  const ACCESS = {
    CREATE: isAccess(CMS_POST_CATEGORY_CREATE_PERMISSION_KEY),
  };
  useEffect(() => {
    if (isCreate) {
      dispatch(reqIsCreate(false));
      notification.success({
        message: trans('Create successful'),
        description: '',
        placement: 'topRight',
      });
      props.history.push(PATH.CMS_CATEGORY_POSTS);
    }
  }, [isCreate]);

  const onCancel = () => {
    props.history.push(PATH.CMS_CATEGORY_POSTS);
  };

  const onSubmit = (dataForm) => {
    setData({...dataForm});
  };

  const onFinish = async () => {
    if (!isEmpty(data.fileImage)) {
      data.avatar = await dispatch(uploadImageData([data.fileImage]));
    }
    dispatch(createPostCategory(data));
  };

  return ACCESS.CREATE ? (
    <div>
      <Spin spinning={loading}>
        <CategoryForm
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

export default CategoryCreatePage;
