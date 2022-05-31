import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';

const defaultClient = new ApiClient(defaultFetcher);
const ENDPOINT_BLOCKS = '/v1/blocks/';

const getBlockList = (data) => {
  return defaultClient.getQuery(ENDPOINT_BLOCKS, data);
};

const getBlockDetail = (id) => {
  return defaultClient.get(ENDPOINT_BLOCKS + id);
};

const postBlockCreate = (data) => {
  return defaultClient.post(ENDPOINT_BLOCKS, data);
};

const postBlockUpdate = (id, data) => {
  return defaultClient.put(ENDPOINT_BLOCKS + id, data);
};

const postBlockDelete = (id, data) => {
  return defaultClient.delete(ENDPOINT_BLOCKS + id, data);
};

export default {
  getBlockList,
  getBlockDetail,
  postBlockCreate,
  postBlockUpdate,
  postBlockDelete,
};
