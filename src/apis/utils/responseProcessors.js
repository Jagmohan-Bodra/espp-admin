import store from '~/reduxs/store';
import {jwtAuth} from './fetcher';
import {THROW_ERROR} from '~/reduxs/error/reducer';
import ROUTE_PATH from '~/routers/path';
import {push} from '~/reduxs/routing/actions';
const MESSAGE_BAD_REQUEST = 'Bad Request';

export const logoutOnUnauthorized = (response) => {
  if (response.status === 401) {
    store.dispatch(reqSignOut());
  }
  return response;
};

export function rejectInvalidStatusCode({response, json}) {
  if (json.message && json.message == MESSAGE_BAD_REQUEST) {
    return throwErr({
      message: json.data,
    });
  }
  if (response.status && response.status >= 200 && response.status < 300) {
    return {response, json};
  }
  // errors for redux-form
  if (json.errors) {
    return throwErr(json.errors);
  }
  if (json.data && json.data.errors) {
    return throwErr(json.data);
  }
  throwErr({
    statusCode: response.status,
    message:
      json.message ||
      (json.data && json.data.message) ||
      `Server error: ${response.statusText}`,
  });
}

export async function toJson(response) {
  const responseText = await response.clone().text();
  if (responseText.length === 0) {
    return {
      response,
      json: {
        data: {},
      },
    };
  }
  try {
    const json = await response.json();
    return {response, json};
  } catch (_) {
    // handle error while parsing json
    throwErr({
      statusCode: response.status,
      message: response.statusText,
    });
  }
}

export function getJson(res) {
  if (res && res.json) {
    return res.json;
  }
}

export const checkErr = (res) => {
  if (res.code && res.code >= 400 && res.code <= 500) {
    throwErr(res || {});
    if (res.code === 401) {
      store.dispatch(reqSignOut());
    }
    throw '';
  }
  return res;
};

const throwErr = (errors) => {
  store.dispatch({
    type: THROW_ERROR,
    errors,
  });
};

const reqSignOut = () => async (dispatch) => {
  await jwtAuth.removeToken();
  return dispatch(push(ROUTE_PATH.LOGIN_SCREEN));
};
