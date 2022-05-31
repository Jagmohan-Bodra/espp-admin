import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
import endPoint from '../endPoint';

const defaultClient = new ApiClient(defaultFetcher);

const getSiteList = (data) => {
  return defaultClient.get(endPoint.SITE_LIST, data);
};

const getSiteDetail = (id) => {
  return defaultClient.get(endPoint.SITE_DETAILS(id));
};

const postSiteCreate = (data) => {
  return defaultClient.post(endPoint.SITE_CREATE, data);
};

const postSiteUpdate = (id, data) => {
  return defaultClient.post(endPoint.SITE_UPDATE(id), data);
};

const postSiteDelete = (id, data) => {
  return defaultClient.post(endPoint.SITE_DELETE(id), data);
};

export default {
  getSiteList,
  getSiteDetail,
  postSiteCreate,
  postSiteUpdate,
  postSiteDelete,
};
