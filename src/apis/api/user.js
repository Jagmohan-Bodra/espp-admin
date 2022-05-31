import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';

const defaultClient = new ApiClient(defaultFetcher);

const getUserList = (data) => {
  return defaultClient.getQuery('/v1/users', data);
};

const getUserDetail = (id, data) => {
  return defaultClient.get('/v1/users/' + id, data);
};

const postUserCreate = (data) => {
  return defaultClient.post('/v1/users', data);
};

const postUserUpdate = (id, data) => {
  return defaultClient.put('/v1/users/' + id, data);
};

const postUserDelete = (id, data) => {
  return defaultClient.delete('/v1/users/' + id, data);
};

export default {
  getUserList,
  getUserDetail,
  postUserCreate,
  postUserUpdate,
  postUserDelete,
};
