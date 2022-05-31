import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
const defaultClient = new ApiClient(defaultFetcher);
const ENDPOINT_TAG = '/v1/tags/';

const getTagList = (data) => {
  return defaultClient.getQuery(ENDPOINT_TAG, data);
};

const getTagDetail = (id, data) => {
  return defaultClient.get(ENDPOINT_TAG + id, data);
};

const postTagCreate = (data) => {
  return defaultClient.post(ENDPOINT_TAG, data);
};

const postTagUpdate = (id, data) => {
  return defaultClient.put(ENDPOINT_TAG + id, data);
};

const postTagDelete = (id, data) => {
  return defaultClient.delete(ENDPOINT_TAG + id, data);
};

export default {
  getTagList,
  getTagDetail,
  postTagCreate,
  postTagUpdate,
  postTagDelete,
};
