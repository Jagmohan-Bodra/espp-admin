import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Spin, notification} from 'antd';

import {trans} from '~/components/public/Translate';
import {reqIsUpdate, updateUser} from '~/reduxs/user/action';
import UserForm from '../user-form';
import {ModalDefault} from '~/components/public/modals/ModalDefault';
import ChangePasswordForm from '~/components/private/ChangePasswordForm';
import meApi from '~/apis/api/me';
import {
  changePassword,
  reqIsUpdate as reqIsUpdateMe,
  changeEmailUpdate,
} from '~/reduxs/me/action';
import ChangeEmailForm from '~/components/private/change-email-form';

const UserUpdate = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [visibleEmail, setVisibleEmail] = useState(false);
  const loading = useSelector((state) => state.user.loading);
  const isUpdate = useSelector((state) => state.me.isUpdate);
  const isUpdateUser = useSelector((state) => state.user.isUpdate);
  const [data, setData] = useState({});
  const [dataChangePassword, setDataChangePassword] = useState({});
  const me = useSelector((state) => state.me.data);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isUpdate) {
      dispatch(reqIsUpdateMe(false));
      notification.success({
        message: trans('Change password successful'),
        description: '',
        placement: 'topRight',
      });
    }
  }, [isUpdate]);

  useEffect(() => {
    if (isUpdateUser) {
      dispatch(reqIsUpdate(false));
      notification.success({
        message: trans('Change successful'),
        description: '',
        placement: 'topRight',
      });
      getData();
    }
  }, [isUpdateUser]);

  const getData = () => {
    return meApi.getMe().then((data) => {
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
      } = data.data || {};
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
        userGroupName: ((data.data || {}).userGroup || {}).name,
        userGroup: ((data.data || {}).userGroup || {})._id,
        avatarPath,
      });
    });
  };

  const onSubmit = (dataForm) => {
    setData(dataForm);
  };

  const onFinish = () => {
    dispatch(updateUser((me.data || {})._id, data));
  };

  const onSubmitChange = (dataForm) => {
    setDataChangePassword({...dataForm});
  };

  const onFinishChange = () => {
    dispatch(changePassword(dataChangePassword));
    setVisible(false);
  };

  const onFinishEmailChange = (data) => {
    changeEmailUpdate(data).then((isCheck) => {
      if (isCheck) {
        notification.success({
          message: trans('Change successful'),
          description: '',
          placement: 'topRight',
        });
        getData();
      }
      setVisibleEmail(false);
    });
  };

  const handleChangeEmailClick = () => {
    setVisibleEmail(true);
  };

  return (
    <div>
      <Spin spinning={loading}>
        <UserForm
          me={true}
          data={data}
          onSubmit={onSubmit}
          onFinish={onFinish}
          setVisible={setVisible}
          handleChangeEmailClick={handleChangeEmailClick}
        />
      </Spin>

      <ModalDefault
        visible={visible}
        setVisible={setVisible}
        title={'Change your password'}>
        <ChangePasswordForm
          onFinish={onFinishChange}
          onSubmitChange={onSubmitChange}
        />
      </ModalDefault>

      <ModalDefault
        visible={visibleEmail}
        setVisible={setVisibleEmail}
        title={'Change your email'}>
        <ChangeEmailForm
          data={{email: (data || {}).email}}
          onFinish={onFinishEmailChange}
        />
      </ModalDefault>
    </div>
  );
};

export default withRouter(UserUpdate);
