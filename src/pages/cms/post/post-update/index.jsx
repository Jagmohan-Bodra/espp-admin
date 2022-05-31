import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Spin, notification, Empty} from 'antd';
import {getPostDetail, updatePost, reqIsUpdate} from '~/reduxs/post/action';
import DeleteModal from '../post-delete';
import {trans} from '~/components/public/Translate';
import PostForm from '../post-form';
import ROUTE_PATH from '~/routers/path';
import {isAccess} from '~/helpers/utils';
import {
  CMS_POST_EDIT_PERMISSION_KEY,
  CMS_POST_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';

const PostUpdate = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const loading = useSelector((state) => state.post.loading);
  const obj = useSelector((state) => state.post.obj);
  const isUpdate = useSelector((state) => state.post.isUpdate);
  const {id} = props.match.params;
  const [data, setData] = useState({});
  const ACCESS = {
    VIEW: isAccess(CMS_POST_VIEW_PERMISSION_KEY),
    EDIT: isAccess(CMS_POST_EDIT_PERMISSION_KEY),
  };

  useEffect(() => {
    dispatch(getPostDetail(id));
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
      props.history.push(ROUTE_PATH.CMS_POSTS);
    }
  }, [isUpdate]);

  const onDelete = () => {
    setVisible(true);
  };

  const onCancel = () => {
    props.history.push(ROUTE_PATH.CMS_POSTS);
  };

  const onSubmit = (dataForm) => {
    let data = dataForm;
    delete data.seoProps;
    delete data.styles;
    setData({...data});
  };

  const onFinish = async () => {
    dispatch(updatePost(id, data));
  };

  const deleteSuccess = () => {
    props.history.push(ROUTE_PATH.CMS_POSTS);
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <Spin spinning={loading}>
        <PostForm
          id={id}
          data={obj}
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

export default PostUpdate;
