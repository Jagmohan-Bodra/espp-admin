import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Spin, notification, Empty} from 'antd';

import {trans} from '~/components/public/Translate';
import {getUserDetail, updateUser, reqIsUpdate} from '~/reduxs/user/action';
import UserForm from '../user-form';
import DeleteModal from '../user-delete';
import ROUTE_PATH from '~/routers/path';
import {
  USER_EDIT_PERMISSION_KEY,
  USER_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';

const UserUpdate = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const loading = useSelector((state) => state.user.loading);
  const obj = useSelector((state) => state.user.obj);
  const isUpdate = useSelector((state) => state.user.isUpdate);
  const {id} = props.match.params;
  const [data, setData] = useState({});
  const ACCESS = {
    EDIT: isAccess(USER_EDIT_PERMISSION_KEY),
    VIEW: isAccess(USER_VIEW_PERMISSION_KEY),
  };
  useEffect(() => {
    dispatch(getUserDetail(id));
  }, []);

  useEffect(() => {
    if (obj) {
      const {
        firstName,
        lastName,
        salutation,
        avatar,
        birthday,
        address,
        gender,
        email,
        phone,
        active,
        avatarPath,
      } = obj || {};
      setData({
        firstName,
        lastName,
        salutation,
        avatar,
        birthday,
        address,
        gender,
        email,
        phone,
        active,
        userGroupName: ((obj || {}).userGroup || {}).name,
        userGroup: ((obj || {}).userGroup || {})._id,
        avatarPath,
      });
    }
  }, [obj]);

  useEffect(() => {
    if (isUpdate) {
      dispatch(reqIsUpdate(false));
      notification.success({
        message: trans('Update successful'),
        description: '',
        placement: 'topRight',
      });
      props.history.push(ROUTE_PATH.ADMIN_USER);
    }
  }, [isUpdate]);

  const onDelete = () => {
    setVisible(true);
  };

  const onCancel = () => {
    props.history.push(ROUTE_PATH.ADMIN_USER);
  };

  const onDiscard = () => {
    dispatch(getUserDetail(id));
  };

  const onSubmit = (dataForm) => {
    setData({...dataForm});
  };

  const onFinish = async () => {
    if (ACCESS.EDIT) {
      // if (!isEmpty(data.fileImage)) {
      //   data.avatar = await dispatch(uploadImageData([data.fileImage]));
      // }
      // data.birthday = formatDate(data.birthday);
      dispatch(updateUser(id, data));
    }
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };

  const deleteSuccess = () => {
    props.history.push(ROUTE_PATH.ADMIN_USER);
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <Spin spinning={loading}>
        <UserForm
          id={id}
          data={data}
          onDelete={onDelete}
          onDiscard={onDiscard}
          onSubmit={onSubmit}
          onFinish={onFinish}
        />
      </Spin>
      <DeleteModal
        obj={data}
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

export default withRouter(UserUpdate);
