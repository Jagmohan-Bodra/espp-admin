import * as Types from './type';
import pushNotificationApi from '../../apis/api/push-notification';

export const reqGetList = (query = '') => (dispatch) => {
  dispatch(actLoading(true));
  return pushNotificationApi
    .getList(query)
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

export const reqGetDetails = (id) => (dispatch) => {
  dispatch(actLoading(true));
  return pushNotificationApi
    .getDetails(id)
    .then((data) => {
      dispatch(actGetDetails(data.data));
      dispatch(actLoading(false));
      return data.data;
    })
    .catch(() => {
      dispatch(actLoading(false));
      return;
    });
};

export const reqPostDetele = (id) => (dispatch) => {
  dispatch(actLoading(true));
  return pushNotificationApi
    .postdelete(id)
    .then(() => {
      dispatch(actLoading(false));
      return true;
    })
    .catch(() => {
      dispatch(actLoading(false));
      return false;
    });
};

export const reqPostCreate = (data) => (dispatch) => {
  dispatch(actLoading(true));
  return pushNotificationApi
    .postCreate(data)
    .then(() => {
      dispatch(actLoading(false));
      return true;
    })
    .catch(() => {
      dispatch(actLoading(false));
      return false;
    });
};

export const reqPostUpdate = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  return pushNotificationApi
    .postUpdate(id, data)
    .then(() => {
      dispatch(actLoading(false));
      return true;
    })
    .catch(() => {
      dispatch(actLoading(false));
      return false;
    });
};

export const reqPostPushNotif = (id) => (dispatch) => {
  dispatch(actLoading(true));
  return pushNotificationApi
    .postPushNotif(id)
    .then(() => {
      dispatch(actLoading(false));
      return true;
    })
    .catch(() => {
      dispatch(actLoading(false));
      return false;
    });
};

const actGetDetails = (data) => {
  return {
    type: Types.GET_PUSH_NOTIFICATION_DETAILS,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.PUSH_NOTIFICATION_LOADING,
    data,
  };
};

const actGetList = (data) => {
  return {
    type: Types.GET_PUSH_NOTIFICATION_LIST,
    data,
  };
};
