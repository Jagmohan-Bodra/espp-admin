import * as Types from './type';
import roleApi from '../../apis/api/role';

export const getRoleList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return roleApi
    .getRoleList(query)
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

export const getRoleDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  roleApi
    .getRoleDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createRole = (data) => (dispatch) => {
  dispatch(actIsCreate(false));
  roleApi
    .postRoleCreate(data)
    .then(() => {
      dispatch(actIsCreate(true));
    })
    .catch(() => {
      dispatch(actIsCreate(false));
    });
};

export const updateRole = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  roleApi
    .postRoleUpdate(id, data)
    .then(() => {
      dispatch(actIsUpdate(true));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actIsUpdate(false));
      dispatch(actLoading(false));
    });
};

export const deleteRole = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  roleApi.postRoleDelete(id).then(() => {
    dispatch(actIsDelete(true));
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

const actIsCreate = (data) => {
  return {
    type: Types.ROLE_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.ROLE_IS_UPDATE,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.ROLE_IS_DELETE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_ROLE_ITEM,
    data,
  };
};

const actGetList = (data) => {
  return {
    type: Types.GET_ROLE_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.ROLE_LOADING,
    data,
  };
};
