import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
import endPoint from '../endPoint';

const defaultClient = new ApiClient(defaultFetcher);

const downloadFile = (idFile) => {
  return defaultClient.get(endPoint.DOWNLOAD_FILE(idFile));
};

export default {
  downloadFile,
};
