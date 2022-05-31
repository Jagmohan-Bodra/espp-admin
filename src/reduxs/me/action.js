import * as Types from './type';
import md5 from 'md5';
import meApi from '../../apis/api/me';

export const changeEmailUpdate = (data) => {
  return meApi
    .changeEmail(data)
    .then(() => true)
    .catch(() => false);
};

export const reqGetMe = () => (dispatch) => {
  meApi.getMe().then((data) => {
    dispatch(actGetMe(data));
  });
};

export const reqRemoveMe = () => (dispatch) => {
  return dispatch(actGetMe({}));
};

export const changePassword = ({password = '', newPassword = ''}) => (
  dispatch,
) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  meApi
    .changePasswordMe({
      oldPassword: md5(password),
      newPassword: md5(newPassword),
    })
    .then(() => {
      dispatch(actIsUpdate(true));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actIsUpdate(false));
      dispatch(actLoading(false));
    });
};

const actGetMe = (data) => {
  return {
    type: Types.GET_ME,
    data,
  };
};

export const reqIsUpdate = (data) => (dispatch) => {
  dispatch(actIsUpdate(data));
};

const actIsUpdate = (data) => {
  return {
    type: Types.ME_IS_UPDATE,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.ME_LOADING,
    data,
  };
};
