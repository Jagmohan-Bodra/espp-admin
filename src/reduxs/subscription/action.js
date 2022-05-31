import * as Types from './type';
import subscriptionApi from '../../apis/api/subscription';

export const getSubscriptionList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return subscriptionApi
    .getSubscriptionList(query)
    .then((data) => {
      dispatch(actGetList(data));
      dispatch(actLoading(false));
      return data;
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

const actGetList = (data) => {
  return {
    type: Types.GET_SUBSCRIPTION_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.SUBSCRIPTION_LOADING,
    data,
  };
};
