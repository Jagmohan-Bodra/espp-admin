import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
import endPoint from '../endPoint';

const defaultClient = new ApiClient(defaultFetcher);

const getPostCategoryList = (data) => {
  return defaultClient.getQuery(endPoint.POST_CATEGORY_LIST, data);
};

const getPostCategoryDetail = (id) => {
  return defaultClient.get(endPoint.POST_CATEGORY_DETAILS(id));
};

const postPostCategoryCreate = (data) => {
  return defaultClient.post(endPoint.POST_CATEGORY_CREATE, data);
};

const postPostCategoryUpdate = (id, data) => {
  return defaultClient.put(endPoint.POST_CATEGORY_UPDATE(id), data);
};

const postPostCategoryDelete = (id, data) => {
  return defaultClient.delete(endPoint.POST_CATEGORY_DELETE(id), data);
};

export default {
  getPostCategoryList,
  getPostCategoryDetail,
  postPostCategoryCreate,
  postPostCategoryUpdate,
  postPostCategoryDelete,
};
