import * as types from './type';

const initialState = {
  visible: false,
  propsModal: {},
  okFunc: () => {},
  cancelFunc: () => {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.MODAL_SET_VISIBLE:
      return {
        ...state,
        visible: action.data,
      };
    case types.MODAL_SET_OK_FUNC:
      return {
        ...state,
        okFunc: action.data,
      };
    case types.MODAL_SET_CANCEL_FUNC:
      return {
        ...state,
        cancelFunc: action.data,
      };
    case types.MODAL_SET_PROPS_MODAL:
      return {
        ...state,
        propsModal: action.data,
      };
    default:
      return state;
  }
};
