import * as Types from './type';
import postApi from '../../apis/api/post';

export const getPostListService = (query) => {
  return postApi.getPostList(query).then((data) => data.data);
};

export const getPostList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return postApi
    .getPostList(query)
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

export const getPostDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  return postApi
    .getPostDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
      return data.data;
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createPost = (data) => (dispatch) => {
  dispatch(actIsCreate(false));
  return postApi
    .postPostCreate(data)
    .then(() => {
      dispatch(actIsCreate(true));
      return true;
    })
    .catch(() => {
      dispatch(actIsCreate(false));
      return false;
    });
};

export const updatePost = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  return postApi
    .postPostUpdate(id, data)
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

export const deletePost = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  return postApi
    .postPostDelete(id)
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
    type: Types.GET_POST_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.POST_LOADING,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.POST_ITEM_DELETE,
    data,
  };
};

const actIsCreate = (data) => {
  return {
    type: Types.POST_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.POST_IS_UPDATE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_POST_ITEM,
    data,
  };
};
