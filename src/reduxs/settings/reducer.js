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
    case type.GET_SETTINGS:
      return {
        ...state,
        data: action.data.data,
        metadata: action.data.meta,
      };

    case type.SETTINGS_IS_UPDATE:
      return {
        ...state,
        isUpdate: action.data,
      };

    case type.SETTINGS_LOADING:
      return {
        ...state,
        loading: action.data,
      };
    default:
      return state;
  }
};
