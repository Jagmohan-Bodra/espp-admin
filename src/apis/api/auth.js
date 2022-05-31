import ApiClient from '../apiClient';
import {authFetcher} from '../utils/fetcher';
import endPoint from '../endPoint';

const client = new ApiClient(authFetcher);

const signIn = (data) => {
  return client.post(endPoint.SIGN_IN, data);
};

const forgetPassword = (data) => {
  return client.post(endPoint.FORGET_PASSWORD, data);
};

export default {
  signIn,
  forgetPassword,
};
