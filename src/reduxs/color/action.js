import * as Types from './type';
import colorApi from '../../apis/api/color';

export const getColorList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return colorApi
    .getColorList(query)
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

export const getColorDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  return colorApi
    .getColorDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createColor = (data, onSucces) => (dispatch) => {
  dispatch(actIsCreate(false));
  return colorApi
    .postColorCreate(data)
    .then((data) => {
      dispatch(actIsCreate(true));
      onSucces(data.data);
    })
    .catch(() => {
      dispatch(actIsCreate(false));
    });
};

export const updateColor = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  return colorApi
    .postColorUpdate(id, data)
    .then(() => {
      dispatch(actIsUpdate(true));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actIsUpdate(false));
      dispatch(actLoading(false));
    });
};

export const deleteColor = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  return colorApi.postColorDelete(id).then(() => {
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

export const reqIsUpdateColor = (data) => (dispatch) => {
  dispatch(actIsUpdate(data));
};

const actIsCreate = (data) => {
  return {
    type: Types.COLOR_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.COLOR_IS_UPDATE,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.COLOR_IS_DELETE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_COLOR_ITEM,
    data,
  };
};

const actGetList = (data) => {
  return {
    type: Types.GET_COLOR_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.COLOR_LOADING,
    data,
  };
};
