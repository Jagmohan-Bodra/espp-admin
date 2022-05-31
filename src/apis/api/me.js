import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
const defaultClient = new ApiClient(defaultFetcher);

const getMe = () => {
  return defaultClient.get('/v1/me');
};

const changePasswordMe = (data) => {
  return defaultClient.post('/v1/change-password', data);
};

const changeEmail = (data) => {
  return defaultClient.post('/v1/change-email', data);
};

export default {
  getMe,
  changePasswordMe,
  changeEmail,
};
