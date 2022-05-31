import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';

const defaultClient = new ApiClient(defaultFetcher);

const getEnquiryList = (data) => {
  return defaultClient.getQuery('/v1/enquiries', data);
};

const getEnquiryDetail = (id, data) => {
  return defaultClient.get('/v1/enquiries/' + id, data);
};

const postEnquiryCreate = (data) => {
  return defaultClient.post('/v1/enquiries', data);
};

const postEnquiryUpdate = (id, data) => {
  return defaultClient.put('/v1/enquiries/' + id, data);
};

const postEnquiryDelete = (id, data) => {
  return defaultClient.delete('/v1/enquiries/' + id, data);
};

const postEnquiryInternalNote = (enquiryId, {message}) => {
  return defaultClient.post(`/v1/enquiry-internal-note/${enquiryId}`, {
    message,
  });
};

export default {
  getEnquiryList,
  getEnquiryDetail,
  postEnquiryCreate,
  postEnquiryUpdate,
  postEnquiryDelete,
  postEnquiryInternalNote,
};
