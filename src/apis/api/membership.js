import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
const defaultClient = new ApiClient(defaultFetcher);
const ENDPOINT_MEMBERSHIPS = '/v1/memberships/';

const getMembershipList = (data) => {
  return defaultClient.getQuery(ENDPOINT_MEMBERSHIPS, data);
};

const getMembershipDetail = (id, data) => {
  return defaultClient.get(ENDPOINT_MEMBERSHIPS + id, data);
};

const postMembershipCreate = (data) => {
  return defaultClient.post(ENDPOINT_MEMBERSHIPS, data);
};

const postMembershipUpdate = (id, data) => {
  return defaultClient.put(ENDPOINT_MEMBERSHIPS + id, data);
};

const postMembershipDelete = (id, data) => {
  return defaultClient.delete(ENDPOINT_MEMBERSHIPS + id, data);
};

const getSearchMembership = (data) => {
  return defaultClient.get('/v1/search-memberships', data);
};

export default {
  getMembershipList,
  getMembershipDetail,
  postMembershipCreate,
  postMembershipUpdate,
  postMembershipDelete,
  getSearchMembership,
};
