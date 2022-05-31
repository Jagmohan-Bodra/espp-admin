import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Spin, notification, Empty} from 'antd';
import {
  getPostCategoryDetail,
  updatePostCategory,
  reqIsUpdate,
} from '~/reduxs/post-category/action';
import DeleteModal from '../category-delete';
import {trans} from '~/components/public/Translate';
import CategoryForm from '../category-form';
import ROUTE_PATH from '~/routers/path';
import {isAccess} from '~/helpers/utils';
import {
  CMS_POST_CATEGORY_EDIT_PERMISSION_KEY,
  CMS_POST_CATEGORY_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';

const CategoryUpdate = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const loading = useSelector((state) => state.postCategory.loading);
  const obj = useSelector((state) => state.postCategory.obj);
  const isUpdate = useSelector((state) => state.postCategory.isUpdate);
  const {id} = props.match.params;
  const [data, setData] = useState({});
  const ACCESS = {
    VIEW: isAccess(CMS_POST_CATEGORY_VIEW_PERMISSION_KEY),
    EDIT: isAccess(CMS_POST_CATEGORY_EDIT_PERMISSION_KEY),
  };

  useEffect(() => {
    dispatch(getPostCategoryDetail(id));
  }, []);

  useEffect(() => {
    setData(obj);
  }, [obj]);

  useEffect(() => {
    if (isUpdate) {
      dispatch(reqIsUpdate(false));
      notification.success({
        message: trans('Update successful'),
        description: '',
        placement: 'topRight',
      });
      props.history.push(ROUTE_PATH.CMS_CATEGORY_POSTS);
    }
  }, [isUpdate]);

  const onDelete = () => {
    setVisible(true);
  };

  const onCancel = () => {
    props.history.push(ROUTE_PATH.CMS_CATEGORY_POSTS);
  };

  const onSubmit = (dataForm) => {
    setData({...dataForm});
  };

  const onFinish = () => {
    dispatch(updatePostCategory(id, data));
  };

  const deleteSuccess = () => {
    props.history.push(ROUTE_PATH.CMS_CATEGORY_POSTS);
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <Spin spinning={loading}>
        <CategoryForm
          data={obj}
          id={id}
          onDelete={onDelete}
          onCancel={onCancel}
          onSubmit={onSubmit}
          onFinish={onFinish}
          isView={true}
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

export default CategoryUpdate;
