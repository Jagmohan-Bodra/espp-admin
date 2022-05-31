import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
import endPoint from '../endPoint';

const defaultClient = new ApiClient(defaultFetcher);

const getSeoSettingList = (data) => {
  return defaultClient.get(endPoint.SEO_SETTING_LIST, data);
};

const getSeoSettingDetail = (id) => {
  return defaultClient.get(endPoint.SEO_SETTING_DETAILS(id));
};

const postSeoSettingCreate = (data) => {
  return defaultClient.post(endPoint.SEO_SETTING_CREATE, data);
};

const postSeoSettingUpdate = (id, data) => {
  return defaultClient.post(endPoint.SEO_SETTING_UPDATE(id), data);
};

const postSeoSettingDelete = (id, data) => {
  return defaultClient.post(endPoint.SEO_SETTING_DELETE(id), data);
};

export default {
  getSeoSettingList,
  getSeoSettingDetail,
  postSeoSettingCreate,
  postSeoSettingUpdate,
  postSeoSettingDelete,
};
