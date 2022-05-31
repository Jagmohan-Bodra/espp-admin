import * as Types from './type';
import setingsApi from '../../apis/api/settings';

export const getSettings = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return setingsApi
    .getSettings(query)
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

export const updateSettings = (data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  return setingsApi
    .updateSettings(data)
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

export const reqIsUpdate = (data) => (dispatch) => {
  dispatch(actIsUpdate(data));
};

const actGetList = (data) => {
  return {
    type: Types.GET_SETTINGS,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.SETTINGS_LOADING,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.SETTINGS_IS_UPDATE,
    data,
  };
};
