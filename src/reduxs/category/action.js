import * as Types from './type';
import categoryApi from '../../apis/api/category';

export const getCategoryList = (data) => (dispatch) => {
  dispatch(actLoading(true));
  categoryApi
    .getCategoryList(data)
    .then((data) => {
      dispatch(actGetList(data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const getCategoryDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  categoryApi
    .getCategoryDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createCategory = (data) => (dispatch) => {
  dispatch(actIsCreate(false));
  categoryApi
    .postCategoryCreate(data)
    .then(() => {
      dispatch(actIsCreate(true));
    })
    .catch(() => {
      dispatch(actIsCreate(false));
    });
};

export const updateCategory = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  categoryApi
    .postCategoryUpdate(id, data)
    .then(() => {
      dispatch(actIsUpdate(true));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actIsUpdate(false));
      dispatch(actLoading(false));
    });
};

export const deleteCategory = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  categoryApi.postCategoryDelete(id).then(() => {
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
    type: Types.CATEGORY_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.CATEGORY_IS_UPDATE,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.CATEGORY_IS_DELETE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_CATEGORY_ITEM,
    data,
  };
};

const actGetList = (data) => {
  return {
    type: Types.GET_CATEGORY_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.CATEGORY_LOADING,
    data,
  };
};
