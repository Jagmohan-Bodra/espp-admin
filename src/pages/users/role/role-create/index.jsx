import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Empty, notification, Spin} from 'antd';
import moment from 'moment';
import {isEmpty} from 'lodash';

import {trans} from '~/components/public/Translate';
import {uploadImageData} from '~/reduxs/upload/action';
import {reqIsCreate, createRole} from '~/reduxs/role/action';
import RoleForm from '../role-form';
// import { USER_GROUP_CODE_KEY } from '~/config'
import PATH from '~/routers/path';
import {USER_ROLE_CREATE_PERMISSION_KEY} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';

const RoleCreate = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.role.loading);
  const isCreate = useSelector((state) => state.role.isCreate);
  const [data, setData] = useState({});
  const ACCESS = {
    CREATE: isAccess(USER_ROLE_CREATE_PERMISSION_KEY),
  };
  useEffect(() => {
    if (isCreate) {
      dispatch(reqIsCreate(false));
      notification.success({
        message: trans('Create successful'),
        description: '',
        placement: 'topRight',
      });
      props.history.push(PATH.ADMIN_ROLE);
    }
  }, [isCreate]);

  const onCancel = () => {
    props.history.push(PATH.ADMIN_ROLE);
  };

  const onSubmit = (dataForm) => {
    setData({...dataForm});
  };

  const onFinish = async () => {
    data.birthday = moment(data.birthday).format('YYYY-MM-DD');
    // data.roleGroupCode = USER_GROUP_CODE_KEY.ADMIN;
    if (!isEmpty(data.fileImage)) {
      data.avatar = await dispatch(uploadImageData([data.fileImage]));
    }
    dispatch(createRole(data));
  };

  const onDiscard = () => {
    props.history.push(PATH.ADMIN_ROLE);
  };

  return ACCESS.CREATE ? (
    <div>
      <Spin spinning={loading}>
        <RoleForm
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

export default withRouter(RoleCreate);
