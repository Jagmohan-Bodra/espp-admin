import {
  reqSetVisible,
  reqSetOkFunction,
  reqSetCancelFunction,
  reqSetPropsModal,
} from '~/reduxs/modal/action';
import store from '~/reduxs/store';

export const confirmModal = (dispatch, props, okFunc, cancelFunc) => {
  dispatch(reqSetPropsModal(props));
  dispatch(reqSetVisible(true));
  dispatch(reqSetOkFunction(okFunc));
  dispatch(reqSetCancelFunction(cancelFunc));
};

export const confirmModal_ = (props, okFunc, cancelFunc) => {
  store.dispatch(reqSetPropsModal(props));
  store.dispatch(reqSetVisible(true));
  store.dispatch(reqSetOkFunction(okFunc));
  store.dispatch(reqSetCancelFunction(cancelFunc));
};

export const confirmModalData = (props, okFunc, cancelFunc) => {
  store.dispatch(reqSetPropsModal(props));
  store.dispatch(reqSetVisible(true));
  store.dispatch(reqSetOkFunction(okFunc));
  store.dispatch(reqSetCancelFunction(cancelFunc));
};
