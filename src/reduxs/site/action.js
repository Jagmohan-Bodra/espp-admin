import * as Types from './type';
import siteApi from '../../apis/api/site';

export const getSiteList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return siteApi
    .getSiteList(query)
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

export const getSiteDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  return siteApi
    .getSiteDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
      return data.data;
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createSite = (data) => (dispatch) => {
  dispatch(actIsCreate(false));
  return siteApi
    .postSiteCreate(data)
    .then(() => {
      dispatch(actIsCreate(true));
      return true;
    })
    .catch(() => {
      dispatch(actIsCreate(false));
      return false;
    });
};

export const updateSite = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  return siteApi
    .postSiteUpdate(id, data)
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

export const deleteSite = (id) => (dispatch) => {
  dispatch(actIsCreate(false));
  return siteApi
    .postSiteDelete(id)
    .then(() => {
      dispatch(actIsCreate(true));
      return true;
    })
    .catch(() => false);
};

const actGetList = (data) => {
  return {
    type: Types.GET_SITE_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.SITE_LOADING,
    data,
  };
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

const actIsDelete = (data) => {
  return {
    type: Types.SITE_ITEM_DELETE,
    data,
  };
};

const actIsCreate = (data) => {
  return {
    type: Types.SITE_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.SITE_IS_UPDATE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_SITE_ITEM,
    data,
  };
};
