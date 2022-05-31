import React, {useEffect, useState} from 'react';
import {notification, Empty, Spin} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getPageDetail} from '~/reduxs/page/action';
import {isAccess} from '~/helpers/utils';
import {
  CMS_PAGE_EDIT_PERMISSION_KEY,
  CMS_PAGE_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import VariantForm from '../../variant/variant-form';
import {updateVariant, reqIsUpdate} from '~/reduxs/variant/action';
import {trans} from '~/components/public/Translate';
import pageApi from '~/apis/api/page';

const PageUpdateUI = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const pageObj = useSelector((state) => state.page.obj);
  const isUpdate = useSelector((state) => state.variant.isUpdate);
  const ACCESS = {
    VIEW: isAccess(CMS_PAGE_VIEW_PERMISSION_KEY),
    EDIT: isAccess(CMS_PAGE_EDIT_PERMISSION_KEY),
  };
  const {id} = props.match.params;

  useEffect(() => {
    setLoading(true);
    dispatch(getPageDetail(id))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (isUpdate) {
      dispatch(reqIsUpdate(false));
      notification.success({message: trans('Update successfully')});
    }
  }, [isUpdate]);

  const onDiscard = () => {
    props.history.goBack();
  };

  const onSubmit = (data) => {
    dispatch(updateVariant(data));
  };

  const onSubmitVariant = (data) => {
    setLoading(true);
    return pageApi
      .postPageVariantCreate(id, data)
      .then((data) => {
        setLoading(false);
        return data;
      })
      .catch(() => setLoading(false));
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <Spin spinning={loading}>
        <VariantForm
          data={pageObj.variants}
          onDiscard={onDiscard}
          onSubmit={onSubmit}
          onSubmitVariant={onSubmitVariant}
        />
      </Spin>
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(PageUpdateUI);
