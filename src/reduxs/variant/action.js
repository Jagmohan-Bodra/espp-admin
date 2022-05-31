import * as Types from './type';
import variantApi from '../../apis/api/variant';

export const updateVariant = (data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  return variantApi
    .putVariant(data)
    .then(() => {
      dispatch(actIsUpdate(true));
      dispatch(actLoading(false));
      return true;
    })
    .catch(() => {
      dispatch(actIsUpdate(false));
      dispatch(actLoading(false));
      return false;
    });
};

export const reqIsUpdate = (data) => (dispatch) => {
  dispatch(actIsUpdate(data));
};

const actIsUpdate = (data) => {
  return {
    type: Types.VARIANT_IS_UPDATE,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.VARIANT_IS_LOADING,
    data,
  };
};
