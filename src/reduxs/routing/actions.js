import {SCREEN_CHANGE} from './type';

export const push = (location = '') => async (dispatch) => {
  dispatch({type: SCREEN_CHANGE, screen: location});
};
