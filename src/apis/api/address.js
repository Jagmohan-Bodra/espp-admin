import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
const defaultClient = new ApiClient(defaultFetcher);

const postAddressCreate = (data) => {
  return defaultClient.post('/v1/customer-addresses/', data);
};

const postAddressUpdate = (id, data) => {
  return defaultClient.put('/v1/customer-addresses/' + id, data);
};

const postAddressDelete = (id, data) => {
  return defaultClient.delete('/v1/customer-addresses/' + id, data);
};

export default {
  postAddressCreate,
  postAddressUpdate,
  postAddressDelete,
};
