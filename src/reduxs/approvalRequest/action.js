import * as Types from './type';
import approvalApi from '../../apis/api/approvalRequest';

export const createApprovalRequest = (data) => (dispatch) => {
  dispatch(actIsCreate(false));
  approvalApi
    .postCreateApprovalRequest(data)
    .then(() => {
      dispatch(actIsCreate(true));
    })
    .catch(() => {
      dispatch(actIsCreate(false));
    });
};

export const reqIsCreate = (data) => (dispatch) => {
  dispatch(actIsCreate(data));
};

const actIsCreate = (data) => {
  return {
    type: Types.APPROVAL_REQUEST_IS_CREATE,
    data,
  };
};
