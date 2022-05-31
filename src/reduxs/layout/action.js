import * as Types from './type';

export const reqMenuAdminCollapseChange = (isCollapse) => {
  return (dispatch) => {
    dispatch(actMenuAdminCollapseChange(isCollapse));
  };
};

export const reqMenuAdminTitleChange = (title = '') => {
  return (dispatch) => {
    dispatch(actMenuAdminTitleChange(title));
  };
};

const actMenuAdminCollapseChange = (isCollapse) => {
  return {
    type: Types.MENU_ADMIN_COLLAPSE_CHANGE,
    isCollapse: isCollapse,
  };
};

const actMenuAdminTitleChange = (title) => {
  return {
    type: Types.MENU_ADMIN_TITLE_CHANGE,
    title: title,
  };
};
