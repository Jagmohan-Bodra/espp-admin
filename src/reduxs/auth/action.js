import * as Types from './type';
import authApi from '../../apis/api/auth';
import {jwtAuth} from '../../apis/utils/fetcher';
import {notification} from 'antd';
import {reqRemoveMe} from '../me/action';
import md5 from 'md5';
import {push} from '~/reduxs/routing/actions';
import PATH from '~/routers/path';

export const reqForgetPassword = ({email = ''}) => (dispatch) => {
  authApi.forgetPassword({email}).then((data) => {
    dispatch(actForgetPassword(data));
    notification.success({
      message: `Send password successful`,
      description: '',
      placement: 'topRight',
    });
  });
};

export const reqSignIn = ({email = '', password = '', token = '', os = ''}) => (
  dispatch,
) => {
  return authApi
    .signIn({email, password: md5(password), token, os})
    .then(async (data) => {
      await jwtAuth.setAccessToken(data.data.token);
      dispatch(actSignIn(data.data));
      return true;
    });
};

export const reqSignOut = () => async (dispatch) => {
  await dispatch(reqRemoveMe());
  await jwtAuth.removeToken();
  dispatch(push(PATH.LOGIN_SCREEN));
};

export const reqCheckAuth = () => (dispatch) => {
  if (!jwtAuth.checkToken()) {
    jwtAuth.removeToken();
    dispatch(push(PATH.LOGIN_SCREEN));
  }
};

const actForgetPassword = (data) => {
  return {
    type: Types.FORGET_PASSWORD,
    data,
  };
};

const actSignIn = (data) => {
  return {
    type: Types.SIGN_IN,
    data,
  };
};
