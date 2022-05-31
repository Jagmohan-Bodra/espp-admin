import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';

const defaultClient = new ApiClient(defaultFetcher);

const getRoleList = (data) => {
  return defaultClient.getQuery('/v1/user-groups', data);
};

const getRoleDetail = (id, data) => {
  return defaultClient.get('/v1/user-groups/' + id, data);
};

const postRoleCreate = (data) => {
  return defaultClient.post('/v1/user-groups', data);
};

const postRoleUpdate = (id, data) => {
  return defaultClient.put('/v1/user-groups/' + id, data);
};

const postRoleDelete = (id, data) => {
  return defaultClient.delete('/v1/user-groups/' + id, data);
};

export default {
  getRoleList,
  getRoleDetail,
  postRoleCreate,
  postRoleUpdate,
  postRoleDelete,
};
