import {SIGN_IN, FORGET_PASSWORD, LOG_OUT} from './type';

const initialState = {};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
      };
    case FORGET_PASSWORD:
      return {
        ...state,
      };

    case LOG_OUT:
      return {
        ...state,
      };
    default:
      return state;
  }
};
