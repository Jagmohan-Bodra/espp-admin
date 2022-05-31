import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Empty, notification, Spin} from 'antd';
import moment from 'moment';
import {isEmpty} from 'lodash';

import {trans} from '~/components/public/Translate';
import {uploadImageData} from '~/reduxs/upload/action';
import {reqIsCreate, createUser} from '~/reduxs/user/action';
import UserForm from '../user-form';
// import { USER_GROUP_CODE_KEY } from '~/config'
import PATH from '~/routers/path';
import {USER_CREATE_PERMISSION_KEY} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';

const UserCreate = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const isCreate = useSelector((state) => state.user.isCreate);
  const [data, setData] = useState({});
  const ACCESS = {
    CREATE: isAccess(USER_CREATE_PERMISSION_KEY),
  };

  useEffect(() => {
    if (isCreate) {
      dispatch(reqIsCreate(false));
      notification.success({
        message: trans('Create successful'),
        description: '',
        placement: 'topRight',
      });
      props.history.push(PATH.ADMIN_USER);
    }
  }, [isCreate]);

  const onCancel = () => {
    props.history.push(PATH.ADMIN_USER);
  };

  const onSubmit = (dataForm) => {
    setData({...dataForm});
  };

  const onFinish = async () => {
    data.birthday = moment(data.birthday).format('YYYY-MM-DD');
    // data.userGroupCode = USER_GROUP_CODE_KEY.ADMIN;
    if (!isEmpty(data.fileImage)) {
      data.avatar = await dispatch(uploadImageData([data.fileImage]));
    }
    dispatch(createUser(data));
  };

  return ACCESS.CREATE ? (
    <div>
      <Spin spinning={loading}>
        <UserForm
          onDiscard={onCancel}
          onSubmit={onSubmit}
          onFinish={onFinish}
          isCreate={true}
        />
      </Spin>
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(UserCreate);
