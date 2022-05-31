import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Empty, notification, Spin} from 'antd';

import {trans} from '~/components/public/Translate';
import {reqIsCreate, createMembership} from '~/reduxs/membership/action';
import MembershipForm from '../membership-form';
import PATH from '~/routers/path';
import {CRM_MEMBERSHIP_CREATE_PERMISSION_KEY} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';

const MembershipCreate = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.membership.loading);
  const isCreate = useSelector((state) => state.membership.isCreate);
  const [data, setData] = useState({});
  const ACCESS = {
    CREATE: isAccess(CRM_MEMBERSHIP_CREATE_PERMISSION_KEY),
  };

  useEffect(() => {
    if (isCreate) {
      dispatch(reqIsCreate(false));
      notification.success({
        message: trans('Create successful'),
        description: '',
        placement: 'topRight',
      });
      props.history.push(PATH.CRM_MEMBERSHIP);
    }
  }, [isCreate]);

  const onCancel = () => {
    props.history.push(PATH.CRM_MEMBERSHIP);
  };

  const onSubmit = (dataForm) => {
    setData({...dataForm});
  };

  const onFinish = () => {
    dispatch(createMembership(data));
  };

  return ACCESS.CREATE ? (
    <div>
      <Spin spinning={loading}>
        <MembershipForm
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

export default withRouter(MembershipCreate);
