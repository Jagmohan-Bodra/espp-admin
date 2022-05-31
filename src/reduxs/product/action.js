import * as Types from './type';
import productApi from '../../apis/api/product';

export const getProductPriceListService = (idProduct) => {
  return productApi.getProductPriceList(idProduct).then((data) => data.data);
};

export const putProductPriceService = (
  idProduct,
  {price, moq, membershipId},
) => {
  return productApi
    .putProductPriceUpdate(idProduct, {price, moq, membershipId})
    .then(() => true)
    .catch(() => false);
};

export const getProductListService = (query) => {
  return productApi.getProductList(query).then((data) => data.data);
};

export const getProductList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return productApi
    .getProductList(query)
    .then((data) => {
      dispatch(actGetList(data));
      dispatch(actLoading(false));
      return data;
    })
    .catch(() => {
      dispatch(actLoading(false));
      return;
    });
};

export const getProductsListExport = (query) => {
  return productApi
    .getProductList(query)
    .then((data) => {
      return data;
    })
    .catch(() => {
      return false;
    });
};

export const getProductDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  return productApi
    .getProductDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createProduct = (data, onSucces) => (dispatch) => {
  dispatch(actIsCreate(false));
  return productApi
    .postProductCreate(data)
    .then((data) => {
      dispatch(actIsCreate(true));
      onSucces(data.data);
    })
    .catch(() => {
      dispatch(actIsCreate(false));
    });
};

export const updateProduct = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  return productApi
    .postProductUpdate(id, data)
    .then(() => {
      dispatch(actIsUpdate(true));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actIsUpdate(false));
      dispatch(actLoading(false));
    });
};

export const deleteProduct = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  return productApi.postProductDelete(id).then(() => {
    dispatch(actIsDelete(true));
  });
};

export const reqIsCreate = (data) => (dispatch) => {
  dispatch(actIsCreate(data));
};

export const reqIsUpdate = (data) => (dispatch) => {
  dispatch(actIsUpdate(data));
};

export const reqIsDelete = (data) => (dispatch) => {
  dispatch(actIsDelete(data));
};

export const reqIsUpdateProduct = (data) => (dispatch) => {
  dispatch(actIsUpdate(data));
};

const actIsCreate = (data) => {
  return {
    type: Types.PRODUCT_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.PRODUCT_IS_UPDATE,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.PRODUCT_IS_DELETE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_PRODUCT_ITEM,
    data,
  };
};

const actGetList = (data) => {
  return {
    type: Types.GET_PRODUCT_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.PRODUCT_LOADING,
    data,
  };
};
