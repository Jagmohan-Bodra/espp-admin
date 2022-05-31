import * as type from './type';

const initialState = {
  data: [],
  metadata: {},
  obj: {},
  isCreate: false,
  isUpdate: false,
  loading: false,
  isDelete: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case type.GET_PUSH_NOTIFICATION_LIST:
      return {
        ...state,
        data: action.data.data,
        metadata: action.data.meta,
      };
    case type.GET_PUSH_NOTIFICATION_DETAILS:
      return {
        ...state,
        obj: action.data,
      };
    case type.PUSH_NOTIFICATION_LOADING:
      return {
        ...state,
        loading: action.data,
      };
    default:
      return state;
  }
};
