import * as Types from './type';
import postCategoryApi from '../../apis/api/post-category';

export const getPostCategoryList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return postCategoryApi
    .getPostCategoryList(query)
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

export const getPostCategoryDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  return postCategoryApi
    .getPostCategoryDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
      return data.data;
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createPostCategory = (data) => (dispatch) => {
  dispatch(actIsCreate(false));
  return postCategoryApi
    .postPostCategoryCreate(data)
    .then(() => {
      dispatch(actIsCreate(true));
      return true;
    })
    .catch(() => {
      dispatch(actIsCreate(false));
      return false;
    });
};

export const updatePostCategory = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  return postCategoryApi
    .postPostCategoryUpdate(id, data)
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

export const deletePostCategory = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  return postCategoryApi
    .postPostCategoryDelete(id)
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
    type: Types.GET_POST_CATEGORY_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.POST_CATEGORY_LOADING,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.POST_CATEGORY_ITEM_DELETE,
    data,
  };
};

const actIsCreate = (data) => {
  return {
    type: Types.POST_CATEGORY_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.POST_CATEGORY_IS_UPDATE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_POST_CATEGORY_ITEM,
    data,
  };
};
