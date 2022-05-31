import * as Types from './type';
import membershipApi from '../../apis/api/membership';

export const getMembershipListApi = (data) => {
  return membershipApi.getSearchMembership(data);
};

export const getMembershipList = (data) => (dispatch) => {
  dispatch(actLoading(true));
  return membershipApi
    .getMembershipList(data)
    .then((data) => {
      dispatch(actGetList(data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const getMembershipDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  membershipApi
    .getMembershipDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createMembership = (data) => (dispatch) => {
  dispatch(actIsCreate(false));
  membershipApi
    .postMembershipCreate(data)
    .then(() => {
      dispatch(actIsCreate(true));
    })
    .catch(() => {
      dispatch(actIsCreate(false));
    });
};

export const updateMembership = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  membershipApi
    .postMembershipUpdate(id, data)
    .then(() => {
      dispatch(actIsUpdate(true));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actIsUpdate(false));
      dispatch(actLoading(false));
    });
};

export const deleteMembership = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  membershipApi.postMembershipDelete(id).then(() => {
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
    type: Types.MEMBERSHIP_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.MEMBERSHIP_IS_UPDATE,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.MEMBERSHIP_IS_DELETE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_MEMBERSHIP_ITEM,
    data,
  };
};

const actGetList = (data) => {
  return {
    type: Types.GET_MEMBERSHIP_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.MEMBERSHIP_LOADING,
    data,
  };
};
