import * as Types from './type';
import enquiryApi from '../../apis/api/enquiry';

export const postEnquiryInternalNote = (enquiryId, data) => {
  return enquiryApi
    .postEnquiryInternalNote(enquiryId, data)
    .then(() => true)
    .catch(() => false);
};

export const getEnquiryList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return enquiryApi
    .getEnquiryList(query)
    .then((data) => {
      dispatch(actGetList(data));
      dispatch(actLoading(false));
      return data;
    })
    .catch(() => {
      dispatch(actLoading(false));
      return false;
    });
};

export const getEnquiryDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  enquiryApi
    .getEnquiryDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createEnquiry = (data) => (dispatch) => {
  dispatch(actIsCreate(false));
  enquiryApi
    .postEnquiryCreate(data)
    .then(() => {
      dispatch(actIsCreate(true));
    })
    .catch(() => {
      dispatch(actIsCreate(false));
    });
};

export const updateEnquiry = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  enquiryApi
    .postEnquiryUpdate(id, data)
    .then(() => {
      dispatch(actIsUpdate(true));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actIsUpdate(false));
      dispatch(actLoading(false));
    });
};

export const deleteEnquiry = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  enquiryApi.postEnquiryDelete(id).then(() => {
    dispatch(actIsDelete(true));
  });
};

export const reqIsDelete = (data) => (dispatch) => {
  dispatch(actIsDelete(data));
};

export const reqIsCreate = (data) => (dispatch) => {
  dispatch(actIsCreate(data));
};

export const reqIsUpdate = (data) => (dispatch) => {
  dispatch(actIsUpdate(data));
};

const actIsCreate = (data) => {
  return {
    type: Types.ENQUIRY_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.ENQUIRY_IS_UPDATE,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.ENQUIRY_IS_DELETE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_ENQUIRY_ITEM,
    data,
  };
};

const actGetList = (data) => {
  return {
    type: Types.GET_ENQUIRY_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.ENQUIRY_LOADING,
    data,
  };
};
