import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
import endPoint from '../endPoint';

const defaultClient = new ApiClient(defaultFetcher);

const getList = (query) => {
  return defaultClient.getQuery(endPoint.GET_NOTIFICATION_LIST, query);
};

const getDetails = (id) => {
  return defaultClient.get(endPoint.GET_NOTIFICATION_DETAILS(id));
};

const postRead = (id) => {
  return defaultClient.post(endPoint.GET_NOTIFICATION_READ(id));
};

const postdelete = (id) => {
  return defaultClient.post(endPoint.GET_NOTIFICATION_DELETE(id));
};

const postMultiCreate = (data) => {
  return defaultClient.post(endPoint.POST_NOTIFICATION_MULTI_CREATE, data);
};

export default {
  getList,
  getDetails,
  postdelete,
  postRead,
  postMultiCreate,
};
