import uploadFile from '../../apis/api/uploadFile';

export const actDownloadFile = (id) => {
  return uploadFile.downloadFile(id);
};
