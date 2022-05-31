import * as Types from './type';
import uploadApi from '../../apis/api/upload';

export const reqUploadImage = (imageFile) => async (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actSuccessful(false));
  return await uploadApi
    .uploadImage(imageFile)
    .then((data) => {
      dispatch(actUploadImage(data.data));
      dispatch(actLoading(false));
      dispatch(actSuccessful(true));
      return data;
    })
    .catch(() => {
      dispatch(actLoading(false));
      return false;
    });
};

export const uploadImageData = (files) => async (dispatch) => {
  if (files) {
    const item = files[0];
    return await dispatch(reqUploadImage(item.originFileObj)).then((res) =>
      res ? res.data : undefined,
    );
  }
  return false;
};

export const getImage = (imageLink) => {
  if (imageLink) {
    return uploadApi.getImage(imageLink);
  }
  return undefined;
};

export const reqUploadFileType = (type, file) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actSuccessful(false));
  return uploadApi
    .uploadFileType(type, file)
    .then((data) => {
      dispatch(actUploadFile(data.data));
      dispatch(actLoading(false));
      dispatch(actSuccessful(true));
      return data.data;
    })
    .catch(() => {
      dispatch(actLoading(false));
      return false;
    });
};

export const uploadFileIdType = (type, file) => async (dispatch) => {
  let fileId = 0;
  if (file) {
    fileId = await dispatch(
      reqUploadFileType(type, file.originFileObj),
    ).then((res) => (res ? (res || {}).id : undefined));
  }
  fileId = fileId > 0 ? fileId : 0;
  return fileId;
};

export const uploadFileDataType = (type, file) => async (dispatch) => {
  let fileData = {};
  if (file) {
    fileData = await dispatch(
      reqUploadFileType(type, file.originFileObj),
    ).then((res) => (res ? res : {}));
  }
  return fileData;
};

export const reqUploadFile = (file) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actSuccessful(false));
  return uploadApi
    .uploadFile(file)
    .then((data) => {
      dispatch(actUploadFile(data.data));
      dispatch(actLoading(false));
      dispatch(actSuccessful(true));
      return data.data.id;
    })
    .catch(() => {
      dispatch(actLoading(false));
      return false;
    });
};

export const reqSuccess = (data) => (dispatch) => {
  dispatch(actSuccessful(data));
};

const actUploadImage = (data) => {
  return {
    type: Types.UPLOAD_IMAGE,
    data,
  };
};

const actUploadFile = (data) => {
  return {
    type: Types.UPLOAD_FILE,
    data,
  };
};

const actSuccessful = (data) => {
  return {
    type: Types.UPLOAD_SUCCESSFUL,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.UPLOAD_LOADING,
    data,
  };
};
