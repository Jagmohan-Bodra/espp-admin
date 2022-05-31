import * as Types from './type';
import customerApi from '../../apis/api/customer';

export const postCustomerInternalNote = (customerId, data) => {
  return customerApi
    .postCustomerInternalNote(customerId, data)
    .then(() => true)
    .catch(() => false);
};

export const getCustomerList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return customerApi
    .getCustomerList(query)
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

export const getCustomerDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  return customerApi
    .getCustomerDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createCustomer = (data, onSucces) => (dispatch) => {
  dispatch(actIsCreate(false));
  return customerApi
    .postCustomerCreate(data)
    .then((data) => {
      dispatch(actIsCreate(true));
      onSucces(data.data);
    })
    .catch(() => {
      dispatch(actIsCreate(false));
    });
};

export const updateCustomer = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  return customerApi
    .postCustomerUpdate(id, data)
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

export const deleteCustomer = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  return customerApi.postCustomerDelete(id).then(() => {
    dispatch(actIsDelete(true));
  });
};

export const subspendCustomer = (id) => (dispatch) => {
  dispatch(actIsUpdate(false));
  return customerApi.postCustomerSubspend(id).then(() => {
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

export const reqIsUpdateCustomer = (data) => (dispatch) => {
  dispatch(actIsUpdate(data));
};

const actIsCreate = (data) => {
  return {
    type: Types.CUSTOMER_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.CUSTOMER_IS_UPDATE,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.CUSTOMER_IS_DELETE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_CUSTOMER_ITEM,
    data,
  };
};

const actGetList = (data) => {
  return {
    type: Types.GET_CUSTOMER_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.CUSTOMER_LOADING,
    data,
  };
};
