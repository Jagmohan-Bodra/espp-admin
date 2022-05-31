import * as Types from './type';
import promotionApi from '../../apis/api/promotion';

export const getPromotionList = (query) => (dispatch) => {
  dispatch(actLoading(true));
  return promotionApi
    .getPromotionList(query)
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

export const getPromotionDetail = (id) => (dispatch) => {
  dispatch(actLoading(true));
  promotionApi
    .getPromotionDetail(id)
    .then((data) => {
      dispatch(actGetItem(data.data));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actLoading(false));
    });
};

export const createPromotion = (data) => (dispatch) => {
  dispatch(actIsCreate(false));
  promotionApi
    .postPromotionCreate(data)
    .then(() => {
      dispatch(actIsCreate(true));
    })
    .catch(() => {
      dispatch(actIsCreate(false));
    });
};

export const updatePromotion = (id, data) => (dispatch) => {
  dispatch(actLoading(true));
  dispatch(actIsUpdate(false));
  promotionApi
    .postPromotionUpdate(id, data)
    .then(() => {
      dispatch(actIsUpdate(true));
      dispatch(actLoading(false));
    })
    .catch(() => {
      dispatch(actIsUpdate(false));
      dispatch(actLoading(false));
    });
};

export const deletePromotion = (id) => (dispatch) => {
  dispatch(actIsDelete(false));
  promotionApi.postPromotionDelete(id).then(() => {
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
    type: Types.PROMOTION_IS_CREATE,
    data,
  };
};

const actIsUpdate = (data) => {
  return {
    type: Types.PROMOTION_IS_UPDATE,
    data,
  };
};

const actIsDelete = (data) => {
  return {
    type: Types.PROMOTION_IS_DELETE,
    data,
  };
};

const actGetItem = (data) => {
  return {
    type: Types.GET_PROMOTION_ITEM,
    data,
  };
};

const actGetList = (data) => {
  return {
    type: Types.GET_PROMOTION_LIST,
    data,
  };
};

const actLoading = (data) => {
  return {
    type: Types.PROMOTION_LOADING,
    data,
  };
};
