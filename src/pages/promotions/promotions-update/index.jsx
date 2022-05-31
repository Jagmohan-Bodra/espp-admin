import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Empty, notification} from 'antd';
import {withRouter} from 'react-router-dom';
import {
  getPromotionDetail,
  updatePromotion,
  reqIsUpdate,
} from '~/reduxs/promotion/action.js';
import PromotionsForm from '../promotions-form';
import DeleteModal from '../promotions-delete';
import PATH from '~/routers/path';
import {
  PROMOTION_EDIT_PERMISSION_KEY,
  PROMOTION_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
import {trans} from '~/components/public/Translate';
const PromotionsUpdate = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const loading = useSelector((state) => state.promotion.loading);
  const obj = useSelector((state) => state.promotion.obj);
  const isUpdate = useSelector((state) => state.promotion.isUpdate);
  const {id} = props.match.params;
  const ACCESS = {
    EDIT: isAccess(PROMOTION_EDIT_PERMISSION_KEY),
    VIEW: isAccess(PROMOTION_VIEW_PERMISSION_KEY),
  };

  useEffect(() => {
    dispatch(getPromotionDetail(id));
  }, []);

  useEffect(() => {
    if (isUpdate) {
      dispatch(reqIsUpdate(false));
      notification.success({
        message: 'Update successful',
        description: '',
        placement: 'topRight',
      });
      props.history.push(PATH.PROMOTIONS);
    }
  }, [isUpdate]);

  const onDelete = () => {
    setVisible(true);
  };

  const onDiscard = () => {
    dispatch(getPromotionDetail(id));
  };

  const onSave = async (dataForm) => {
    ACCESS.EDIT && dispatch(updatePromotion(id, dataForm));
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };

  const deleteSuccess = () => {
    props.history.push(PATH.PROMOTIONS);
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <PromotionsForm
        id={id}
        data={obj}
        onDelete={onDelete}
        onDiscard={onDiscard}
        onSave={onSave}
        loading={loading}
      />
      <DeleteModal
        obj={obj}
        visible={visible}
        setVisible={setVisible}
        onFinish={deleteSuccess}
      />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(PromotionsUpdate);
