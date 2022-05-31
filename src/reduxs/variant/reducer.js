import * as type from './type';

const initialState = {
  isUpdate: false,
  isLoading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case type.VARIANT_IS_UPDATE:
      return {
        ...state,
        isUpdate: action.data,
      };
    case type.VARIANT_IS_LOADING:
      return {
        ...state,
        isLoading: action.data,
      };
    default:
      return state;
  }
};
