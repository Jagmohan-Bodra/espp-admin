import ApiClient from '../apiClient';
import {defaultFetcher} from '../utils/fetcher';
import endPoint from '../endPoint';

const defaultClient = new ApiClient(defaultFetcher);

const uploadImage = (data) => {
  return defaultClient.postUploadFile('/v1/drive/upload', data);
};

const getImage = (imageLink) => {
  return defaultClient.get('/v1/get-image/' + imageLink);
};

const uploadFileType = (type, data) => {
  return defaultClient.postUploadFile('/v1/upload-file/' + type, data);
};

const uploadFile = (data) => {
  return defaultClient.postUploadFile(endPoint.UPLOAD_FILE('sub'), data);
};

export default {
  uploadImage,
  getImage,
  uploadFileType,
  uploadFile,
};
