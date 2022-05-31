import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {
  getProductDetail,
  updateProduct,
  reqIsUpdate,
  getProductPriceListService,
  putProductPriceService,
} from '~/reduxs/product/action';
import ProductForm from '../product-form';
import DeleteModal from '../product-delete';
import PATH from '~/routers/path';
import {
  INVENTORY_PRODUCT_EDIT_PERMISSION_KEY,
  INVENTORY_PRODUCT_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
import {Empty, notification} from 'antd';
import {trans} from '~/components/public/Translate';

const ProductUpdate = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [productPrice, setProductPrice] = useState(false);
  const loading = useSelector((state) => state.product.loading);
  const obj = useSelector((state) => state.product.obj);
  const isUpdate = useSelector((state) => state.product.isUpdate);
  const {id} = props.match.params;
  const ACCESS = {
    EDIT: isAccess(INVENTORY_PRODUCT_EDIT_PERMISSION_KEY),
    VIEW: isAccess(INVENTORY_PRODUCT_VIEW_PERMISSION_KEY),
  };
  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
      getProductPriceListService(id).then((data) => setProductPrice(data));
    }
  }, [id]);

  useEffect(() => {
    if (isUpdate) {
      dispatch(reqIsUpdate(false));
    }
  }, [isUpdate]);

  const onDelete = () => {
    setVisible(true);
  };

  const onCancel = () => {
    props.history.push(PATH.INVENTORY_PRODUCT);
  };

  const onDiscard = () => {
    dispatch(getProductDetail(id));
  };

  const onSave = (dataForm) => {
    if (ACCESS.EDIT) {
      dispatch(updateProduct(id, dataForm)).then(() =>
        dispatch(getProductDetail(id)),
      );
    }
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };

  const deleteSuccess = () => {
    props.history.push(PATH.INVENTORY_PRODUCT);
  };

  const handleSubmitPrice = (dataProductPrice) => {
    if (ACCESS.EDIT) {
      return putProductPriceService(id, dataProductPrice)
        .then(() =>
          getProductPriceListService(id).then((data) => setProductPrice(data)),
        )
        .then(() => true);
    }

    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <ProductForm
        loading={loading}
        data={obj}
        productPrice={productPrice}
        handleSubmitPrice={handleSubmitPrice}
        onDelete={onDelete}
        onDiscard={onDiscard}
        onSave={onSave}
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

export default withRouter(ProductUpdate);
