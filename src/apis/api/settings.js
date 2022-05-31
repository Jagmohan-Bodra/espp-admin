import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
import endPoint from '../endPoint';

const defaultClient = new ApiClient(defaultFetcher);

const getSettings = (data) => {
  return defaultClient.getQuery(endPoint.SETTINGS_LIST, data);
};

const updateSettings = (data) => {
  return defaultClient.put(endPoint.SETTINGS_UPDATE, data);
};

export default {
  getSettings,
  updateSettings,
};
