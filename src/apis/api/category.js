import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
const defaultClient = new ApiClient(defaultFetcher);
const ENDPOINT_CATEGORYS = '/v1/product-categories/';

const getCategoryList = (data) => {
  return defaultClient.getQuery(ENDPOINT_CATEGORYS, data);
};

const getCategoryDetail = (id, data) => {
  return defaultClient.get(ENDPOINT_CATEGORYS + id, data);
};

const postCategoryCreate = (data) => {
  return defaultClient.post(ENDPOINT_CATEGORYS, data);
};

const postCategoryUpdate = (id, data) => {
  return defaultClient.put(ENDPOINT_CATEGORYS + id, data);
};

const postCategoryDelete = (id, data) => {
  return defaultClient.delete(ENDPOINT_CATEGORYS + id, data);
};

export default {
  getCategoryList,
  getCategoryDetail,
  postCategoryCreate,
  postCategoryUpdate,
  postCategoryDelete,
};
