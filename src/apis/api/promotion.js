import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';

const defaultClient = new ApiClient(defaultFetcher);

const getPromotionList = (data) => {
  return defaultClient.getQuery('/v1/promotions', data);
};

const getPromotionDetail = (id, data) => {
  return defaultClient.get('/v1/promotions/' + id, data);
};

const postPromotionCreate = (data) => {
  return defaultClient.post('/v1/promotions', data);
};

const postPromotionUpdate = (id, data) => {
  return defaultClient.put('/v1/promotions/' + id, data);
};

const postPromotionDelete = (id, data) => {
  return defaultClient.delete('/v1/promotions/' + id, data);
};

export default {
  getPromotionList,
  getPromotionDetail,
  postPromotionCreate,
  postPromotionUpdate,
  postPromotionDelete,
};
