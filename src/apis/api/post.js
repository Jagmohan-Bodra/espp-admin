import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
import endPoint from '../endPoint';

const defaultClient = new ApiClient(defaultFetcher);

const getPostList = (data) => {
  return defaultClient.getQuery(endPoint.POST_LIST, data);
};

const getPostDetail = (id) => {
  return defaultClient.get(endPoint.POST_DETAILS(id));
};

const postPostCreate = (data) => {
  return defaultClient.post(endPoint.POST_CREATE, data);
};

const postPostUpdate = (id, data) => {
  return defaultClient.put(endPoint.POST_UPDATE(id), data);
};

const postPostDelete = (id, data) => {
  return defaultClient.delete(endPoint.POST_DELETE(id), data);
};

export default {
  getPostList,
  getPostDetail,
  postPostCreate,
  postPostUpdate,
  postPostDelete,
};
