import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
const defaultClient = new ApiClient(defaultFetcher);
const ENDPOINT_PRODUCT = '/v1/products/';

const getProductList = (data) => {
  return defaultClient.getQuery(ENDPOINT_PRODUCT, data);
};

const getProductDetail = (id, data) => {
  return defaultClient.get(ENDPOINT_PRODUCT + id, data);
};

const postProductCreate = (data) => {
  return defaultClient.post(ENDPOINT_PRODUCT, data);
};

const postProductUpdate = (id, data) => {
  return defaultClient.put(ENDPOINT_PRODUCT + id, data);
};

const postProductDelete = (id, data) => {
  return defaultClient.delete(ENDPOINT_PRODUCT + id, data);
};

const getProductPriceList = (productId) => {
  return defaultClient.getQuery(`/v1/product-price/${productId}`);
};

const putProductPriceUpdate = (productId, data) => {
  return defaultClient.put(`/v1/product-price/${productId}`, data);
};

const getProductsStatistical = (data) => {
  return defaultClient.getQuery(`/v1/products-statistical`, data);
};

export default {
  getProductList,
  getProductDetail,
  postProductCreate,
  postProductUpdate,
  postProductDelete,
  getProductPriceList,
  putProductPriceUpdate,
  getProductsStatistical,
};
