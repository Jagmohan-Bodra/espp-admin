import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getBrandDetail, updateBrand, reqIsUpdate} from '~/reduxs/brand/action';
import BrandForm from '../brand-form';
import DeleteModal from '../brand-delete';
import PATH from '~/routers/path';
import {isAccess} from '~/helpers/utils';
import {Empty, notification} from 'antd';
import {trans} from '~/components/public/Translate';
import {
  INVENTORY_BRAND_EDIT_PERMISSION_KEY,
  INVENTORY_BRAND_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';

const BrandUpdate = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const loading = useSelector((state) => state.brand.loading);
  const obj = useSelector((state) => state.brand.obj);
  const isUpdate = useSelector((state) => state.brand.isUpdate);
  const {id} = props.match.params;
  const ACCESS = {
    EDIT: isAccess(INVENTORY_BRAND_EDIT_PERMISSION_KEY),
    VIEW: isAccess(INVENTORY_BRAND_VIEW_PERMISSION_KEY),
  };

  useEffect(() => {
    dispatch(getBrandDetail(id));
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
    dispatch(getBrandDetail(id));
  };

  const onSave = (dataForm) => {
    ACCESS.EDIT && dispatch(updateBrand(id, dataForm));
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };

  const deleteSuccess = () => {
    props.history.push(PATH.INVENTORY_BRAND);
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <BrandForm
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

export default withRouter(BrandUpdate);
