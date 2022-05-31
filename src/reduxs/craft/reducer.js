import {PAGE_SIZE_TYPE} from '~/constants/master-data';
import * as type from './type';

const initialState = {
  styles: {},
  customize: false,
  mode: PAGE_SIZE_TYPE.PC,
  iframeRef: undefined,
  styleCustomizeBlock: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case type.SET_STYLE_CRAFT:
      return {
        ...state,
        styles: action.data,
      };
    case type.SET_CUSTOMIZE_CRAFT:
      return {
        ...state,
        customize: action.data,
      };
    case type.SET_SCREEN_MODE_CRAFT:
      return {
        ...state,
        mode: action.data,
      };
    case type.SET_DOM_IFRAME_CRAFT:
      return {
        ...state,
        iframeRef: action.data,
      };
    case type.SET_STYLE_CUSTOMIZE_BLOCK:
      return {
        ...state,
        styleCustomizeBlock: action.data,
      };
    default:
      return state;
  }
};
