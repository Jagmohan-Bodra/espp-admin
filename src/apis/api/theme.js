import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';

const defaultClient = new ApiClient(defaultFetcher);
const ENDPOINT_THEMES = '/v1/themes';

const getThemeList = (data) => {
  return defaultClient.getQuery(ENDPOINT_THEMES, data);
};

const getThemeDetail = (id) => {
  return defaultClient.get(`${ENDPOINT_THEMES}/${id}`);
};

const postThemeCreate = (data) => {
  return defaultClient.post(ENDPOINT_THEMES, data);
};

const postThemeUpdate = (id, data) => {
  return defaultClient.put(`${ENDPOINT_THEMES}/${id}`, data);
};

const postThemeDelete = (id, data) => {
  return defaultClient.delete(`${ENDPOINT_THEMES}/${id}`, data);
};

const postThemeVariantCreate = (id, data) => {
  return defaultClient.post(`/v1/themes/${id}/variant`, data);
};

export default {
  getThemeList,
  getThemeDetail,
  postThemeCreate,
  postThemeUpdate,
  postThemeDelete,
  postThemeVariantCreate,
};
