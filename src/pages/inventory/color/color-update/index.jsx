import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getColorDetail, updateColor, reqIsUpdate} from '~/reduxs/color/action';
import ColorForm from '../color-form';
import DeleteModal from '../color-delete';
import PATH from '~/routers/path';
import {
  INVENTORY_COLOR_EDIT_PERMISSION_KEY,
  INVENTORY_COLOR_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
import {Empty, notification} from 'antd';
import {trans} from '~/components/public/Translate';

const ColorUpdate = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const loading = useSelector((state) => state.color.loading);
  const obj = useSelector((state) => state.color.obj);
  const isUpdate = useSelector((state) => state.color.isUpdate);
  const {id} = props.match.params;
  const ACCESS = {
    EDIT: isAccess(INVENTORY_COLOR_EDIT_PERMISSION_KEY),
    VIEW: isAccess(INVENTORY_COLOR_VIEW_PERMISSION_KEY),
  };
  useEffect(() => {
    dispatch(getColorDetail(id));
  }, []);

  useEffect(() => {
    if (isUpdate) {
      dispatch(reqIsUpdate(false));
    }
  }, [isUpdate]);

  const onDelete = () => {
    setVisible(true);
  };

  const onCancel = () => {
    props.history.push(PATH.CRM_CUSTOMER);
  };

  const onDiscard = () => {
    dispatch(getColorDetail(id));
  };

  const onSave = (dataForm) => {
    ACCESS.EDIT && dispatch(updateColor(id, dataForm));
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };

  const deleteSuccess = () => {
    props.history.push(PATH.INVENTORY_COLOR);
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <ColorForm
        id={id}
        data={obj}
        onDelete={onDelete}
        onDiscard={onDiscard}
        onSave={onSave}
        isUpdate={isUpdate}
        loading={loading}
      />
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

export default withRouter(ColorUpdate);
