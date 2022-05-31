import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Empty, notification} from 'antd';
import {reqIsCreate, createBrand} from '~/reduxs/brand/action';
import BrandForm from '../brand-form';
import PATH from '~/routers/path';
import {INVENTORY_BRAND_CREATE_PERMISSION_KEY} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';

const BrandCreate = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.brand.loading);
  const isCreate = useSelector((state) => state.brand.isCreate);
  const ACCESS = {
    CREATE: isAccess(INVENTORY_BRAND_CREATE_PERMISSION_KEY),
  };

  useEffect(() => {
    if (isCreate) {
      dispatch(reqIsCreate(false));
      notification.success({
        message: 'Create successful',
        description: '',
        placement: 'topRight',
      });
      props.history.push(PATH.INVENTORY_BRAND);
    }
  }, [isCreate]);

  const onSave = (data) => {
    dispatch(createBrand(data));
  };

  return ACCESS.CREATE ? (
    <div>
      <BrandForm loading={loading} onSave={onSave} />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(BrandCreate);
