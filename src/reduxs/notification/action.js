import * as Types from './type';
import notificationApi from '../../apis/api/notification';

export const reqGetList = (query = '') => (dispatch) => {
  dispatch(actLoading(true));
  notificationApi
    .getList(query)
    .then((data) => {
      dispatch(actGetList(data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const reqGetListCount = (query = '') => (dispatch) => {
  dispatch(actLoading(true));
  notificationApi
    .getList(query)
    .then((data) => {
      dispatch(actGetListCount(data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const reqGetDetails = (id) => (dispatch) => {
  dispatch(actLoading(true));
  notificationApi
    .getDetails(id)
    .then((data) => {
      dispatch(actGetDetails(data.data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const reqPostRead = (id) => (dispatch) => {
  dispatch(actLoading(true));
  notificationApi
    .postRead(id)
    .then(() => {
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const reqPostDetele = (id) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actDelete(false));
  notificationApi
    .postdelete(id)
    .then(() => {
      dispatch(actLoading(false));
      dispatch(actDelete(true));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const reqPostCreateMulti = (data) => (dispatch) => {
  dispatch(actLoading(true));
  return notificationApi
    .postMultiCreate(data)
    .then(() => {
      dispatch(actLoading(false));
      return true;
    })
    .catch(() => {
      dispatch(actLoading(false));
      return false;
    });
};

export const reqDelete = (data) => (dispatch) => {
  dispatch(actDelete(data));
};

const actGetDetails = (data) => {
  return {
    type: Types.GET_NOTIFICATION_DETAILS,
    data,
  };
};

const actDelete = (data) => {
  return {
    type: Types.NOTIFICATION_DELETE,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.NOTIFICATION_LOADING,
    data,
  };
};

const actGetList = (data) => {
  return {
    type: Types.GET_NOTIFICATION_LIST,
    data,
  };
};

const actGetListCount = (data) => {
  return {
    type: Types.GET_NOTIFICATION_LIST_COUNT,
    data,
  };
};
