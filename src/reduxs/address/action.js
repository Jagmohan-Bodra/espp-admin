import * as Types from './type';
import addressApi from '../../apis/api/address';

export const createAddress = (data, onSucces) => (dispatch) => {
  dispatch(actIsCreate(false));
  return addressApi
    .postAddressCreate(data)
    .then((data) => {
      dispatch(actIsCreate(true));
      onSucces(data.data);
    })
    .catch(() => {
      dispatch(actIsCreate(false));
    });
};

export const updateAddress = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  return addressApi
    .postAddressUpdate(id, data)
    .then(() => {
      dispatch(actIsUpdate(true));
      dispatch(actLoading(false));
      return true;
    })
    .catch(() => {
      dispatch(actIsUpdate(false));
      dispatch(actLoading(false));
      return false;
    });
};

export const deleteAddress = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  return addressApi.postAddressDelete(id).then(() => {
    dispatch(actIsDelete(true));
  });
};

export const subspendAddress = (id) => (dispatch) => {
  dispatch(actIsUpdate(false));
  return addressApi.postAddressSubspend(id).then(() => {
    dispatch(actIsUpdate(true));
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

export const reqIsUpdateAddress = (data) => (dispatch) => {
  dispatch(actIsUpdate(data));
};

const actIsCreate = (data) => {
  return {
    type: Types.ADDRESS_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.ADDRESS_IS_UPDATE,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.ADDRESS_IS_DELETE,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.ADDRESS_LOADING,
    data,
  };
};
