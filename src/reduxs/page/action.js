import * as Types from './type';
import pageApi from '../../apis/api/page';

export const getPageList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return pageApi
    .getPageList(query)
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

export const getPageDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  return pageApi
    .getPageDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
      return data.data;
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createPage = (data) => (dispatch) => {
  dispatch(actIsCreate(false));
  return pageApi
    .postPageCreate(data)
    .then((obj) => {
      dispatch(actIsCreate(true));
      return obj.data;
    })
    .catch(() => {
      dispatch(actIsCreate(false));
      return false;
    });
};

export const updatePage = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  return pageApi
    .postPageUpdate(id, data)
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

export const deletePage = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  return pageApi
    .postPageDelete(id)
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
    type: Types.GET_PAGE_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.PAGE_LOADING,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.PAGE_IS_DELETE,
    data,
  };
};

const actIsCreate = (data) => {
  return {
    type: Types.PAGE_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.PAGE_IS_UPDATE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_PAGE_ITEM,
    data,
  };
};
