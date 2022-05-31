import * as Types from './type';

export const reqSetStyle = (data) => (dispatch) => {
  dispatch(actSetStyle(data));
};

export const reqSetCustomize = (data) => (dispatch) => {
  dispatch(actSetCusomize(data));
};

export const reqSetScreenMode = (data) => (dispatch) => {
  dispatch(actSetScreenMode(data));
};

export const reqSetIframeRef = (data) => (dispatch) => {
  dispatch(actSetIframeRef(data));
};

export const reqSetStyleCustomizeBlock = (data) => (dispatch) => {
  dispatch(actSetStyleCustomizeBlock(data));
};

export const actSetIframeRef = (data) => {
  return {
    type: Types.SET_DOM_IFRAME_CRAFT,
    data,
  };
};

const actSetStyleCustomizeBlock = (data) => {
  return {
    type: Types.SET_STYLE_CUSTOMIZE_BLOCK,
    data,
  };
};

const actSetScreenMode = (data) => {
  return {
    type: Types.SET_SCREEN_MODE_CRAFT,
    data,
  };
};

const actSetCusomize = (data) => {
  return {
    type: Types.SET_CUSTOMIZE_CRAFT,
    data,
  };
};

const actSetStyle = (data) => {
  return {
    type: Types.SET_STYLE_CRAFT,
    data,
  };
};
