import {SCREEN_CHANGE} from './type';

const initialState = {
  curScreen: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SCREEN_CHANGE:
      return {
        ...state,
        curScreen: action.screen,
      };
    default:
      return state;
  }
};
