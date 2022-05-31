import * as Types from './type';
import parentApi from '../../apis/api/parent';
export const getParentList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return parentApi
    .getParentList(query)
    .then((data) => {
      dispatch(actGetList(data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const getReplacementClassList = (id, query = {}) => (dispatch) => {
  dispatch(actLoading(true));
  return parentApi
    .getReplacementClassList(id, query)
    .then((data) => {
      dispatch(actGetReplacementClassList(data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const getParentDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  parentApi
    .getParentDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createParent = (data) => (dispatch) => {
  dispatch(actIsCreate(false));
  parentApi
    .postParentCreate(data)
    .then(() => {
      dispatch(actIsCreate(true));
    })
    .catch(() => {
      dispatch(actIsCreate(false));
    });
};

export const updateParent = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  parentApi
    .postParentUpdate(id, data)
    .then(() => {
      dispatch(actIsUpdate(true));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actIsUpdate(false));
      dispatch(actLoading(false));
    });
};

export const deleteParent = (id) => (dispatch) => {
  dispatch(actIsCreate(false));
  parentApi.postParentDelete(id).then(() => {
    dispatch(actIsCreate(true));
  });
};

export const getChildrenList = (id) => (dispatch) => {
  parentApi.getChildrenList(id).then((data) => {
    dispatch(actGetChildrenList(data.data));
  });
};

const actLoading = (data) => {
  return {
    type: Types.PARENT_LOADING,
    data,
  };
};

export const reqIsCreate = (data) => (dispatch) => {
  dispatch(actIsCreate(data));
};

export const reqIsUpdate = (data) => (dispatch) => {
  dispatch(actIsUpdate(data));
};

export const reqCancelReplacementClass = (studentId, lessonId) => (
  dispatch,
) => {
  dispatch(actIsCancelClass(false));
  parentApi.cancelReplacementClass(studentId, lessonId).then(() => {
    dispatch(actIsCancelClass(true));
  });
};

export const reqIsCancelClass = (data) => (dispatch) => {
  dispatch(actIsCancelClass(data));
};

export const reqIsRequestAWorkSheet = (parentId, studentId, lessonId) => (
  dispatch,
) => {
  dispatch(actIsRequestAWorkSheet(false));
  parentApi.requestAWorksheet(parentId, studentId, lessonId).then(() => {
    dispatch(actIsRequestAWorkSheet(true));
  });
};

export const reqIsRequest = (data) => (dispatch) => {
  dispatch(actIsRequestAWorkSheet(data));
};

const actIsRequestAWorkSheet = (data) => {
  return {
    type: Types.PARENT_IS_REQUEST_A_WORKSHEET,
    data,
  };
};

const actIsCreate = (data) => {
  return {
    type: Types.PARENT_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.PARENT_IS_UPDATE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_PARENT_ITEM,
    data,
  };
};

const actGetList = (data) => {
  return {
    type: Types.GET_PARENT_LIST,
    data,
  };
};

const actGetChildrenList = (data) => {
  return {
    type: Types.GET_CHILDREN_LIST,
    data,
  };
};

const actGetReplacementClassList = (data) => {
  return {
    type: Types.GET_REPLACEMENT_CLASS_LIST,
    data,
  };
};

const actIsCancelClass = (data) => {
  return {
    type: Types.PARENT_IS_CANCEL_CLASS,
    data,
  };
};
