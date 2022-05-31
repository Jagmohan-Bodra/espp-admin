import * as Types from './type';
import themeApi from '../../apis/api/theme';

export const getThemeList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return themeApi
    .getThemeList(query)
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

export const getThemeDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  return themeApi
    .getThemeDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
      return data.data;
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createTheme = (data) => (dispatch) => {
  dispatch(actIsCreate(false));
  return themeApi
    .postThemeCreate(data)
    .then((results) => {
      dispatch(actIsCreate(true));
      return results.data;
    })
    .catch(() => {
      dispatch(actIsCreate(false));
      return false;
    });
};

export const updateTheme = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  return themeApi
    .postThemeUpdate(id, data)
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

export const deleteTheme = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  return themeApi
    .postThemeDelete(id)
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
    type: Types.GET_THEME_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.THEME_LOADING,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.THEME_ITEM_DELETE,
    data,
  };
};

const actIsCreate = (data) => {
  return {
    type: Types.THEME_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.THEME_IS_UPDATE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_THEME_ITEM,
    data,
  };
};
