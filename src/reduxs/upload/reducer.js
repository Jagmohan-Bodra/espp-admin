import * as type from './type';

const initialState = {
  url: '',
  id: '',
  loading: false,
  issuccessful: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case type.UPLOAD_IMAGE:
      return {
        ...state,
        url: action.data.url,
      };
    case type.UPLOAD_FILE:
      return {
        ...state,
        id: action.data.id,
      };
    case type.UPLOAD_LOADING:
      return {
        ...state,
        loading: action.data,
      };

    default:
      return state;
  }
};
