import * as Types from './type';
import ordersApi from '~/apis/api/orders';

export const getOrdersList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return ordersApi
    .getOrdersList(query)
    .then((data) => {
      dispatch(actGetList(data));
      dispatch(actLoading(false));
      return data;
    })
    .catch(() => {
      dispatch(actLoading(false));
      return false;
    });
};

export const getOrdersListExport = (query) => {
  return ordersApi
    .getOrdersList(query)
    .then((data) => {
      return data;
    })
    .catch(() => {
      return false;
    });
};

export const getOrdersDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  ordersApi
    .getOrdersDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createOrders = (data) => (dispatch) => {
  dispatch(actIsCreate(false));
  ordersApi
    .postOrdersCreate(data)
    .then(() => {
      dispatch(actIsCreate(true));
    })
    .catch(() => {
      dispatch(actIsCreate(false));
    });
};

export const updateOrders = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  ordersApi
    .postOrdersUpdate(id, data)
    .then(() => {
      dispatch(actIsUpdate(true));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actIsUpdate(false));
      dispatch(actLoading(false));
    });
};

export const deleteOrders = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  ordersApi.postOrdersDelete(id).then(() => {
    dispatch(actIsDelete(true));
  });
};

export const sendInvoiceEmail = (id) => (dispatch) => {
  dispatch(actIsSend(false));
  ordersApi.sendInvoiceEmail(id).then(() => {
    dispatch(actIsSend(true));
  });
};

export const reqIsDelete = (data) => (dispatch) => {
  dispatch(actIsDelete(data));
};

export const reqIsCreate = (data) => (dispatch) => {
  dispatch(actIsCreate(data));
};

export const reqIsUpdate = (data) => (dispatch) => {
  dispatch(actIsUpdate(data));
};

export const reqIsSend = (data) => (dispatch) => {
  dispatch(actIsSend(data));
};

const actIsCreate = (data) => {
  return {
    type: Types.ORDERS_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.ORDERS_IS_UPDATE,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.ORDERS_IS_DELETE,
    data,
  };
};

const actIsSend = (data) => {
  return {
    type: Types.ORDERS_IS_SEND,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_ORDERS_ITEM,
    data,
  };
};

const actGetList = (data) => {
  return {
    type: Types.GET_ORDERS_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.ORDERS_LOADING,
    data,
  };
};
