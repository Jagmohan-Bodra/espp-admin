import * as Types from './type';

export const reqSetVisible = (data) => (dispatch) => {
  return dispatch(actSetVisible(data));
};

export const reqSetOkFunction = (func) => (dispatch) => {
  return dispatch(actSetOkFunction(func));
};

export const reqSetCancelFunction = (func) => (dispatch) => {
  return dispatch(actSetCancelFunction(func));
};

export const reqSetPropsModal = (data) => (dispatch) => {
  return dispatch(actSetPropsModalFunction(data));
};

const actSetVisible = (data) => {
  return {
    type: Types.MODAL_SET_VISIBLE,
    data,
  };
};

const actSetOkFunction = (data) => {
  return {
    type: Types.MODAL_SET_OK_FUNC,
    data,
  };
};

const actSetCancelFunction = (data) => {
  return {
    type: Types.MODAL_SET_CANCEL_FUNC,
    data,
  };
};

const actSetPropsModalFunction = (data) => {
  return {
    type: Types.MODAL_SET_PROPS_MODAL,
    data,
  };
};
