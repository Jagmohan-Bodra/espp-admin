import * as Types from './type';
import brandApi from '../../apis/api/brand';

export const getBrandList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return brandApi
    .getBrandList(query)
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

export const getBrandDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  return brandApi
    .getBrandDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createBrand = (data, onSucces) => (dispatch) => {
  dispatch(actIsCreate(false));
  return brandApi
    .postBrandCreate(data)
    .then((data) => {
      dispatch(actIsCreate(true));
      onSucces(data.data);
    })
    .catch(() => {
      dispatch(actIsCreate(false));
    });
};

export const updateBrand = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  return brandApi
    .postBrandUpdate(id, data)
    .then(() => {
      dispatch(actIsUpdate(true));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actIsUpdate(false));
      dispatch(actLoading(false));
    });
};

export const deleteBrand = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  return brandApi.postBrandDelete(id).then(() => {
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

export const reqIsUpdateBrand = (data) => (dispatch) => {
  dispatch(actIsUpdate(data));
};

const actIsCreate = (data) => {
  return {
    type: Types.BRAND_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.BRAND_IS_UPDATE,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.BRAND_IS_DELETE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_BRAND_ITEM,
    data,
  };
};

const actGetList = (data) => {
  return {
    type: Types.GET_BRAND_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.BRAND_LOADING,
    data,
  };
};
