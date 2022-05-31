import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Spin, notification, Empty} from 'antd';

import {trans} from '~/components/public/Translate';
import {getRoleDetail, updateRole, reqIsUpdate} from '~/reduxs/role/action';
import RoleForm from '../role-form';
import DeleteModal from '../role-delete';
import PATH from '~/routers/path';
import {isAccess} from '~/helpers/utils';
import {
  USER_ROLE_EDIT_PERMISSION_KEY,
  USER_ROLE_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';

const RoleUpdate = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const loading = useSelector((state) => state.role.loading);
  const obj = useSelector((state) => state.role.obj);
  const isUpdate = useSelector((state) => state.role.isUpdate);
  const {id} = props.match.params;
  const [data, setData] = useState({});
  const ACCESS = {
    EDIT: isAccess(USER_ROLE_EDIT_PERMISSION_KEY),
    VIEW: isAccess(USER_ROLE_VIEW_PERMISSION_KEY),
  };
  useEffect(() => {
    dispatch(getRoleDetail(id));
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
      props.history.push(PATH.ADMIN_ROLE);
    }
  }, [isUpdate]);

  const onDelete = () => {
    setVisible(true);
  };

  const onCancel = () => {
    props.history.push(PATH.ADMIN_ROLE);
  };

  const onDiscard = () => {
    dispatch(getRoleDetail(id));
  };

  const onSubmit = (dataForm) => {
    setData({...dataForm});
  };

  const onFinish = async () => {
    ACCESS.EDIT && dispatch(updateRole(id, data));
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };

  const deleteSuccess = () => {
    props.history.push(PATH.ADMIN_ROLE);
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <Spin spinning={loading}>
        <RoleForm
          id={id}
          data={obj}
          onDelete={onDelete}
          onDiscard={onDiscard}
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

export default withRouter(RoleUpdate);
