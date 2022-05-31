import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';

const defaultClient = new ApiClient(defaultFetcher);
const ENDPOINT_PAGES = '/v1/pages/';

const getPageList = (data) => {
  return defaultClient.getQuery(ENDPOINT_PAGES, data);
};

const getPageDetail = (id) => {
  return defaultClient.get(ENDPOINT_PAGES + id);
};

const postPageCreate = (data) => {
  return defaultClient.post(ENDPOINT_PAGES, data);
};

const postPageVariantCreate = (id, data) => {
  return defaultClient.post(`/v1/pages/${id}/variant`, data);
};

const postPageUpdate = (id, data) => {
  return defaultClient.put(ENDPOINT_PAGES + id, data);
};

const postPageDelete = (id, data) => {
  return defaultClient.delete(ENDPOINT_PAGES + id, data);
};

export default {
  getPageList,
  getPageDetail,
  postPageCreate,
  postPageUpdate,
  postPageDelete,
  postPageVariantCreate,
};
