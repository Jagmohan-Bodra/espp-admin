import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';

const defaultClient = new ApiClient(defaultFetcher);

const getOrdersList = (data) => {
  return defaultClient.getQuery('/v1/orders', data);
};

const getOrdersDetail = (id, data) => {
  return defaultClient.get('/v1/orders/' + id, data);
};

const postOrdersCreate = (data) => {
  return defaultClient.post('/v1/orders', data);
};

const postOrdersUpdate = (id, data) => {
  return defaultClient.put('/v1/orders/' + id, data);
};

const postOrdersDelete = (id, data) => {
  return defaultClient.delete('/v1/orders/' + id, data);
};

const sendInvoiceEmail = (id, data) => {
  return defaultClient.post('/v1/orders/' + id + '/send-invoice-email', data);
};

const putOrderUpdateArchiveAll = (data) => {
  return defaultClient.put(`/v1/orders-update-archive-all`, data);
};

const getOrdersStatistical = (data) => {
  return defaultClient.getQuery(`/v1/orders-statistical`, data);
};

export default {
  getOrdersList,
  getOrdersDetail,
  postOrdersCreate,
  postOrdersUpdate,
  postOrdersDelete,
  sendInvoiceEmail,
  putOrderUpdateArchiveAll,
  getOrdersStatistical,
};
