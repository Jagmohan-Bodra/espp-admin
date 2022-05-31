import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Empty, notification} from 'antd';
import {reqIsCreate, createPromotion} from '~/reduxs/promotion/action';
import PromotionsForm from '../promotions-form';
import PATH from '~/routers/path';
import {isAccess} from '~/helpers/utils';
import {PROMOTION_CREATE_PERMISSION_KEY} from '~/constants/permissions';

const PromotionsCreate = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.promotion.loading);
  const isCreate = useSelector((state) => state.promotion.isCreate);
  const ACCESS = {
    CREATE: isAccess(PROMOTION_CREATE_PERMISSION_KEY),
  };

  useEffect(() => {
    if (isCreate) {
      dispatch(reqIsCreate(false));
      notification.success({
        message: 'Create successful',
        description: '',
        placement: 'topRight',
      });
      props.history.push(PATH.PROMOTIONS);
    }
  }, [isCreate]);

  const onSave = (data) => {
    dispatch(createPromotion(data));
  };

  return ACCESS.CREATE ? (
    <div>
      <PromotionsForm loading={loading} onSave={onSave} />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(PromotionsCreate);
