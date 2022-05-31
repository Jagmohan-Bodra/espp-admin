import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
const defaultClient = new ApiClient(defaultFetcher);
const ENDPOINT_COLOR = '/v1/colors/';

const getColorList = (data) => {
  return defaultClient.getQuery(ENDPOINT_COLOR, data);
};

const getColorDetail = (id, data) => {
  return defaultClient.get(ENDPOINT_COLOR + id, data);
};

const postColorCreate = (data) => {
  return defaultClient.post(ENDPOINT_COLOR, data);
};

const postColorUpdate = (id, data) => {
  return defaultClient.put(ENDPOINT_COLOR + id, data);
};

const postColorDelete = (id, data) => {
  return defaultClient.delete(ENDPOINT_COLOR + id, data);
};

export default {
  getColorList,
  getColorDetail,
  postColorCreate,
  postColorUpdate,
  postColorDelete,
};
