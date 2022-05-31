import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
const defaultClient = new ApiClient(defaultFetcher);
const ENDPOINT_CUSTOMERS = '/v1/customers/';

const getCustomerList = (data) => {
  return defaultClient.getQuery(ENDPOINT_CUSTOMERS, data);
};

const getCustomerDetail = (id, data) => {
  return defaultClient.get(ENDPOINT_CUSTOMERS + id, data);
};

const postCustomerCreate = (data) => {
  return defaultClient.post(ENDPOINT_CUSTOMERS, data);
};

const postCustomerUpdate = (id, data) => {
  return defaultClient.put(ENDPOINT_CUSTOMERS + id, data);
};

const postCustomerDelete = (id, data) => {
  return defaultClient.delete(ENDPOINT_CUSTOMERS + id, data);
};
const postCustomerSubspend = (id, data) => {
  return defaultClient.post(`/v1/customers/` + id + `/subspend`, data);
};
const postCustomerInternalNote = (customerId, {message}) => {
  return defaultClient.post(`/v1/customer-internal-note/${customerId}`, {
    message,
  });
};
const getCustomerStatistical = (data) => {
  return defaultClient.getQuery(`/v1/customer-statistical`, data);
};

export default {
  getCustomerList,
  getCustomerDetail,
  postCustomerCreate,
  postCustomerUpdate,
  postCustomerDelete,
  postCustomerInternalNote,
  postCustomerSubspend,
  getCustomerStatistical,
};
