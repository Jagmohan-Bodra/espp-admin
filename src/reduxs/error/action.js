import {DROP_ERROR, THROW_ERROR} from './reducer';

export const dropError = () => (dispatch) => {
  dispatch({type: DROP_ERROR});
};

export const throwErr = (errors) => (dispatch) => {
  dispatch({type: THROW_ERROR, errors});
};
