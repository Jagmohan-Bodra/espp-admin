import React, {useEffect, useState} from 'react';
import {notification, Empty, Spin} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getThemeDetail} from '~/reduxs/theme/action';
import {isAccess} from '~/helpers/utils';
import {
  CMS_THEME_EDIT_PERMISSION_KEY,
  CMS_THEME_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import VariantForm from '../../variant/variant-form';
import ROUTE_PATH from '~/routers/path';
import {updateVariant, reqIsUpdate} from '~/reduxs/variant/action';
import {trans} from '~/components/public/Translate';
import themeApi from '~/apis/api/theme';

const ThemeUpdateUI = (props) => {
  const dispatch = useDispatch();
  const themeObj = useSelector((state) => state.theme.obj);
  const isUpdate = useSelector((state) => state.variant.isUpdate);
  const [loading, setLoading] = useState(false);
  const ACCESS = {
    VIEW: isAccess(CMS_THEME_VIEW_PERMISSION_KEY),
    EDIT: isAccess(CMS_THEME_EDIT_PERMISSION_KEY),
  };
  const {id} = props.match.params;

  useEffect(() => {
    setLoading(true);
    dispatch(getThemeDetail(id))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (isUpdate) {
      dispatch(reqIsUpdate(false));
      notification.success({message: trans('Update successfully')});
      props.history.push(ROUTE_PATH.CMS_THEMES);
    }
  }, [isUpdate]);

  const onDiscard = () => {
    props.history.push(ROUTE_PATH.CMS_THEMES);
  };

  const onSubmit = (data) => {
    dispatch(updateVariant(data));
  };

  const onSubmitVariant = (data) => {
    setLoading(true);
    return themeApi
      .postThemeVariantCreate(id, data)
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
          data={themeObj.variants}
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

export default withRouter(ThemeUpdateUI);
