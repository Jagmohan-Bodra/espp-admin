import * as Types from './type';
import blockApi from '../../apis/api/block';

export const getBlockList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return blockApi
    .getBlockList(query)
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

export const getBlockDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  return blockApi
    .getBlockDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
      return data.data;
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createBlock = (data) => (dispatch) => {
  dispatch(actIsCreate(false));
  return blockApi
    .postBlockCreate(data)
    .then((results) => {
      dispatch(actIsCreate(true));
      return results.data;
    })
    .catch(() => {
      dispatch(actIsCreate(false));
      return false;
    });
};

export const updateBlock = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  return blockApi
    .postBlockUpdate(id, data)
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

export const deleteBlock = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  return blockApi
    .postBlockDelete(id)
    .then(() => {
      dispatch(actIsDelete(true));
      return true;
    })
    .catch(() => false);
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

const actGetList = (data) => {
  return {
    type: Types.GET_BLOCK_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.BLOCK_LOADING,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.BLOCK_ITEM_DELETE,
    data,
  };
};

const actIsCreate = (data) => {
  return {
    type: Types.BLOCK_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.BLOCK_IS_UPDATE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_BLOCK_ITEM,
    data,
  };
};
