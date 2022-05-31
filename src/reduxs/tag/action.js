import * as Types from './type';
import tagApi from '../../apis/api/tag';

export const getTagList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return tagApi
    .getTagList(query)
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

export const getTagDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  return tagApi
    .getTagDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createTag = (data, onSucces) => (dispatch) => {
  dispatch(actIsCreate(false));
  return tagApi
    .postTagCreate(data)
    .then((data) => {
      dispatch(actIsCreate(true));
      onSucces(data.data);
    })
    .catch(() => {
      dispatch(actIsCreate(false));
    });
};

export const updateTag = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  return tagApi
    .postTagUpdate(id, data)
    .then(() => {
      dispatch(actIsUpdate(true));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actIsUpdate(false));
      dispatch(actLoading(false));
    });
};

export const deleteTag = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  return tagApi.postTagDelete(id).then(() => {
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

export const reqIsUpdateTag = (data) => (dispatch) => {
  dispatch(actIsUpdate(data));
};

const actIsCreate = (data) => {
  return {
    type: Types.TAG_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.TAG_IS_UPDATE,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.TAG_IS_DELETE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_TAG_ITEM,
    data,
  };
};

const actGetList = (data) => {
  return {
    type: Types.GET_TAG_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.TAG_LOADING,
    data,
  };
};
