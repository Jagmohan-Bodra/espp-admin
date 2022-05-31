import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Empty, notification} from 'antd';
import {trans} from '~/components/public/Translate';
import {reqIsCreate, createProduct} from '~/reduxs/product/action';
import ProductForm from '../product-form';
import PATH from '~/routers/path';
import {INVENTORY_PRODUCT_CREATE_PERMISSION_KEY} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';

const ProductCreate = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);
  const isCreate = useSelector((state) => state.product.isCreate);
  const ACCESS = {
    CREATE: isAccess(INVENTORY_PRODUCT_CREATE_PERMISSION_KEY),
  };
  useEffect(() => {
    if (isCreate) {
      dispatch(reqIsCreate(false));
      notification.success({
        message: trans('Create successful'),
        description: '',
        placement: 'topRight',
      });
      props.history.push(PATH.INVENTORY_PRODUCT);
    }
  }, [isCreate]);

  const onSave = (dataForm) => {
    return dispatch(createProduct(dataForm));
  };

  return ACCESS.CREATE ? (
    <div>
      <ProductForm loading={loading} onSave={onSave} />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(ProductCreate);
