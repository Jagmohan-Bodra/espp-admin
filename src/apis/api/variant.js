import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';

const defaultClient = new ApiClient(defaultFetcher);

const putVariant = (data) => {
  return defaultClient.put('/v1/variants', {data});
};

export default {
  putVariant,
};
