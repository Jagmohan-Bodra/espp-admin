import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';

const defaultClient = new ApiClient(defaultFetcher);

const getApprovalDetails = (id) => {
  return defaultClient.get(`/v1/approval/${id}`);
};

const postApprovalLink = (url, data) => {
  return defaultClient.postFetch(url, data);
};

export default {
  getApprovalDetails,
  postApprovalLink,
};
