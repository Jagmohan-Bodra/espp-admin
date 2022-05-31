import * as Types from './type';

const init = {
  isCollapse: false,
  title: {},
};

export default (state = init, action) => {
  switch (action.type) {
    case Types.MENU_ADMIN_COLLAPSE_CHANGE:
      return {
        ...state,
        isCollapse: action.isCollapse,
      };
    case Types.MENU_ADMIN_TITLE_CHANGE:
      return {
        ...state,
        title: action.title,
      };
    default:
      return {...state};
  }
};
