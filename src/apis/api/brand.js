import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
const defaultClient = new ApiClient(defaultFetcher);
const ENDPOINT_BRAND = '/v1/brands/';

const getBrandList = (data) => {
  return defaultClient.getQuery(ENDPOINT_BRAND, data);
};

const getBrandDetail = (id, data) => {
  return defaultClient.get(ENDPOINT_BRAND + id, data);
};

const postBrandCreate = (data) => {
  return defaultClient.post(ENDPOINT_BRAND, data);
};

const postBrandUpdate = (id, data) => {
  return defaultClient.put(ENDPOINT_BRAND + id, data);
};

const postBrandDelete = (id, data) => {
  return defaultClient.delete(ENDPOINT_BRAND + id, data);
};

export default {
  getBrandList,
  getBrandDetail,
  postBrandCreate,
  postBrandUpdate,
  postBrandDelete,
};
