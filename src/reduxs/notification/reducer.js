import * as type from './type';

const initialState = {
  data: [],
  dataCount: [],
  metadata: {},
  obj: {},
  isCreate: false,
  isUpdate: false,
  loading: false,
  isDelete: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case type.GET_NOTIFICATION_LIST:
      return {
        ...state,
        data: action.data.data,
        metadata: action.data.meta,
      };
    case type.GET_NOTIFICATION_LIST_COUNT:
      return {
        ...state,
        dataCount: action.data.data,
      };

    case type.GET_NOTIFICATION_DETAILS:
      return {
        ...state,
        obj: action.data,
      };
    case type.NOTIFICATION_DELETE:
      return {
        ...state,
        isDelete: action.data,
      };
    case type.NOTIFICATION_LOADING:
      return {
        ...state,
        loading: action.data,
      };
    default:
      return state;
  }
};
