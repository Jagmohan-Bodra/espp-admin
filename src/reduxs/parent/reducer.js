import * as type from './type';

const initialState = {
  data: [],
  replacementClassList: {},
  metadata: {},
  obj: {},
  isCreate: false,
  isUpdate: false,
  loading: false,
  isCancelClass: false,
  isRequestAWorksheet: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case type.GET_PARENT_LIST:
      return {
        ...state,
        data: action.data.data,
        metadata: action.data.meta,
      };

    case type.GET_REPLACEMENT_CLASS_LIST:
      return {
        ...state,
        replacementClassList: action.data,
      };

    case type.GET_PARENT_ITEM:
      return {
        ...state,
        obj: action.data,
      };

    case type.PARENT_ITEM_UPDATE:
      return {
        ...state,
      };

    case type.PARENT_ITEM_IN_ACTIVE:
      return {
        ...state,
      };

    case type.PARENT_IS_CREATE:
      return {
        ...state,
        isCreate: action.data,
      };
    case type.PARENT_IS_UPDATE:
      return {
        ...state,
        isUpdate: action.data,
      };
    case type.GET_CHILDREN_LIST:
      return {
        ...state,
        data: action.data,
      };

    case type.PARENT_IS_CANCEL_CLASS:
      return {
        ...state,
        isCancelClass: action.data,
      };

    case type.PARENT_IS_REQUEST_A_WORKSHEET:
      return {
        ...state,
        isRequestAWorksheet: action.data,
      };
    default:
      return state;
  }
};
