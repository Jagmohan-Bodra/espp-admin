import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
import endPoint from '../endPoint';

const defaultClient = new ApiClient(defaultFetcher);

const getList = (query) => {
  return defaultClient.getQuery(endPoint.GET_PUSH_NOTIFICATION_LIST, query);
};

const getDetails = (id) => {
  return defaultClient.get(endPoint.GET_PUSH_NOTIFICATION_DETAILS(id));
};

const postdelete = (id) => {
  return defaultClient.post(endPoint.POST_PUSH_NOTIFICATION_DELETE(id));
};

const postCreate = (data) => {
  return defaultClient.post(endPoint.POST_PUSH_NOTIFICATION_CREATE, data);
};

const postUpdate = (id, data) => {
  return defaultClient.post(endPoint.POST_PUSH_NOTIFICATION_UPDATE(id), data);
};

const postPushNotif = (id) => {
  return defaultClient.post(endPoint.POST_PUSH_NOTIFICATION_PUSH_NOTIF(id));
};

export default {
  getList,
  getDetails,
  postdelete,
  postCreate,
  postUpdate,
  postPushNotif,
};
