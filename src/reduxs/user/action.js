import * as Types from './type';
import userApi from '../../apis/api/user';

export const getUserList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return userApi
    .getUserList(query)
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

export const getUserDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  return userApi
    .getUserDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createUser = (data, onSucces) => (dispatch) => {
  dispatch(actIsCreate(false));
  return userApi
    .postUserCreate(data)
    .then((data) => {
      dispatch(actIsCreate(true));
      onSucces(data.data);
    })
    .catch(() => {
      dispatch(actIsCreate(false));
    });
};

export const updateUser = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  return userApi
    .postUserUpdate(id, data)
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

export const deleteUser = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  return userApi.postUserDelete(id).then(() => {
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

export const reqIsUpdateUser = (data) => (dispatch) => {
  dispatch(actIsUpdate(data));
};

const actIsCreate = (data) => {
  return {
    type: Types.USER_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.USER_IS_UPDATE,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.USER_IS_DELETE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_USER_ITEM,
    data,
  };
};

const actGetList = (data) => {
  return {
    type: Types.GET_USER_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.USER_LOADING,
    data,
  };
};
