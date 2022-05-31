import * as Types from './type';
import seoSettingApi from '../../apis/api/seoSetting';

export const getSeoSettingList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return seoSettingApi
    .getSeoSettingList(query)
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

export const getSeoSettingDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  return seoSettingApi
    .getSeoSettingDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
      return data.data;
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createSeoSetting = (data) => (dispatch) => {
  dispatch(actIsCreate(false));
  return seoSettingApi
    .postSeoSettingCreate(data)
    .then(() => {
      dispatch(actIsCreate(true));
      return true;
    })
    .catch(() => {
      dispatch(actIsCreate(false));
      return false;
    });
};

export const updateSeoSetting = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  return seoSettingApi
    .postSeoSettingUpdate(id, data)
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

export const deleteSeoSetting = (id) => (dispatch) => {
  dispatch(actIsCreate(false));
  return seoSettingApi
    .postSeoSettingDelete(id)
    .then(() => {
      dispatch(actIsCreate(true));
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
    type: Types.GET_SEO_SETTING_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.SEO_SETTING_LOADING,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.SEO_SETTING_ITEM_DELETE,
    data,
  };
};

const actIsCreate = (data) => {
  return {
    type: Types.SEO_SETTING_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.SEO_SETTING_IS_UPDATE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_SEO_SETTING_ITEM,
    data,
  };
};
