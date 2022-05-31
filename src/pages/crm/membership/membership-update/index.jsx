import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Spin, notification, Empty} from 'antd';

import {trans} from '~/components/public/Translate';
import {
  getMembershipDetail,
  updateMembership,
  reqIsUpdate,
} from '~/reduxs/membership/action';
import MembershipForm from '../membership-form';
import DeleteModal from '../membership-delete';
import PATH from '~/routers/path';
import {
  CRM_MEMBERSHIP_EDIT_PERMISSION_KEY,
  CRM_MEMBERSHIP_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';

const MembershipUpdate = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const loading = useSelector((state) => state.membership.loading);
  const obj = useSelector((state) => state.membership.obj);
  const isUpdate = useSelector((state) => state.membership.isUpdate);
  const {id} = props.match.params;
  const [data, setData] = useState({});
  const ACCESS = {
    EDIT: isAccess(CRM_MEMBERSHIP_EDIT_PERMISSION_KEY),
    VIEW: isAccess(CRM_MEMBERSHIP_VIEW_PERMISSION_KEY),
  };

  useEffect(() => {
    dispatch(getMembershipDetail(id));
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
      props.history.push(PATH.CRM_MEMBERSHIP);
    }
  }, [isUpdate]);

  const onDelete = () => {
    setVisible(true);
  };

  const onCancel = () => {
    props.history.push(PATH.CRM_MEMBERSHIP);
  };

  const onDiscard = () => {
    dispatch(getMembershipDetail(id));
  };

  const onSubmit = (dataForm) => {
    setData({...dataForm});
  };

  const onFinish = async () => {
    ACCESS.EDIT && dispatch(updateMembership(id, data));
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };

  const deleteSuccess = () => {
    props.history.push(PATH.CRM_MEMBERSHIP);
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <Spin spinning={loading}>
        <MembershipForm
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

export default withRouter(MembershipUpdate);
