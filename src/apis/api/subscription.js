import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
const defaultClient = new ApiClient(defaultFetcher);

const getSubscriptionList = (data) => {
  return defaultClient.getQuery(`/v1/subscription`, data);
};

export default {
  getSubscriptionList,
};
