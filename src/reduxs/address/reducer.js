import * as type from './type';

const initialState = {
  data: [],
  metadata: {},
  obj: {},
  isCreate: false,
  isUpdate: false,
  isDelete: false,
  loading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case type.GET_ADDRESS_LIST:
      return {
        ...state,
        data: action.data.data,
        metadata: action.data.meta,
      };

    case type.GET_ADDRESS_ITEM:
      return {
        ...state,
        obj: action.data,
      };

    case type.ADDRESS_ITEM_UPDATE:
      return {
        ...state,
      };

    case type.ADDRESS_ITEM_IN_ACTIVE:
      return {
        ...state,
      };

    case type.ADDRESS_IS_CREATE:
      return {
        ...state,
        isCreate: action.data,
      };

    case type.ADDRESS_LOADING:
      return {
        ...state,
        loading: action.data,
      };

    case type.ADDRESS_IS_UPDATE:
      return {
        ...state,
        isUpdate: action.data,
      };

    case type.ADDRESS_IS_DELETE:
      return {
        ...state,
        isDelete: action.data,
      };
    default:
      return state;
  }
};
