import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Empty, notification, Spin} from 'antd';
import DeleteModal from '../theme-delete';
import {getThemeDetail, updateTheme, reqIsUpdate} from '~/reduxs/theme/action';
import ThemeForm from '../theme-form';
import ROUTE_PATH from '~/routers/path';
import {
  CMS_THEME_EDIT_PERMISSION_KEY,
  CMS_THEME_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
import {trans} from '~/components/public/Translate';

const ThemeUpdate = (props) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const loading = useSelector((state) => state.theme.loading);
  const obj = useSelector((state) => state.theme.obj);
  const isUpdate = useSelector((state) => state.theme.isUpdate);
  const {id} = props.match.params;
  const [data, setData] = useState({});
  const ACCESS = {
    EDIT: isAccess(CMS_THEME_EDIT_PERMISSION_KEY),
    VIEW: isAccess(CMS_THEME_VIEW_PERMISSION_KEY),
  };

  useEffect(() => {
    dispatch(getThemeDetail(id));
  }, []);

  useEffect(() => {
    setData(obj);
  }, [obj]);

  useEffect(() => {
    if (isUpdate) {
      dispatch(reqIsUpdate(false));
      props.history.push(ROUTE_PATH.CMS_THEMES);
    }
  }, [isUpdate]);

  const onDelete = () => {
    setVisible(true);
  };

  const onCancel = () => {
    props.history.push(ROUTE_PATH.CMS_THEMES);
  };

  const onSubmit = (dataForm) => {
    setData({...dataForm});
  };

  const onFinish = () => {
    ACCESS.EDIT && dispatch(updateTheme(id, data));
    !ACCESS.EDIT && notification.warning({message: trans('Permission denied')});
  };

  const deleteSuccess = () => {
    props.history.push(ROUTE_PATH.CMS_THEMES);
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <Spin spinning={loading}>
        <ThemeForm
          id={id}
          data={obj}
          onDelete={onDelete}
          onCancel={onCancel}
          onSubmit={onSubmit}
          onFinish={onFinish}
        />
      </Spin>
      <DeleteModal
        obj={obj}
        visible={visible}
        setVisible={setVisible}
        onSubmit={onCancel}
        onFinish={deleteSuccess}
      />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(ThemeUpdate);
