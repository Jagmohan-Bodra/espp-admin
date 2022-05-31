import * as type from './type';

const initialState = {
  data: [],
  metadata: {},
  loading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case type.GET_SUBSCRIPTION_LIST:
      return {
        ...state,
        data: action.data.data,
        metadata: action.data.meta,
      };
    case type.SUBSCRIPTION_LOADING:
      return {
        ...state,
        loading: action.data,
      };
    default:
      return state;
  }
};
