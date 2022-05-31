import * as type from './type';

const initialState = {
  data: [],
  metadata: {},
  obj: {},
  isCreate: false,
  isUpdate: false,
  loading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case type.GET_APPROVAL_REQUEST_LIST:
      return {
        ...state,
        data: action.data,
        metadata: action.data.meta,
      };

    case type.GET_APPROVAL_REQUEST_ITEM:
      return {
        ...state,
        obj: action.data,
      };

    case type.APPROVAL_REQUEST_ITEM_UPDATE:
      return {
        ...state,
      };

    case type.APPROVAL_REQUEST_ITEM_IN_ACTIVE:
      return {
        ...state,
      };

    case type.APPROVAL_REQUEST_IS_CREATE:
      return {
        ...state,
        isCreate: action.data,
      };

    case type.APPROVAL_REQUEST_LOADING:
      return {
        ...state,
        loading: action.data,
      };

    case type.APPROVAL_REQUEST_IS_UPDATE:
      return {
        ...state,
        isUpdate: action.data,
      };
    default:
      return state;
  }
};
