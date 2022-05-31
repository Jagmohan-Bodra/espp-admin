import approvalApi from '../../apis/api/approval';

export const getApprovalDetails = (id) => {
  return approvalApi.getApprovalDetails(id).then((data) => data.data);
};

export const postApprovalLink = (url, data) => {
  return approvalApi.postApprovalLink(url, data).then((data) => data.data);
};
