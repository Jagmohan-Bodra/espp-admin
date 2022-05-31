import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';

const defaultClient = new ApiClient(defaultFetcher);

const postCreateApprovalRequest = (data) => {
  return defaultClient.post('/v1/approval-request/create', data);
};

export default {
  postCreateApprovalRequest,
};
