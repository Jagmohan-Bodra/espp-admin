import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Spin, notification, Empty} from 'antd';
import {createTheme, reqIsCreate} from '~/reduxs/theme/action';
import ThemeForm from '../theme-form';
import PATH from '~/routers/path';
import {isAccess} from '~/helpers/utils';
import {CMS_THEME_CREATE_PERMISSION_KEY} from '~/constants/permissions';

const ThemeCreate = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.theme.loading);
  const isCreate = useSelector((state) => state.theme.isCreate);
  const [data, setData] = useState({});
  const ACCESS = {
    CREATE: isAccess(CMS_THEME_CREATE_PERMISSION_KEY),
  };
  useEffect(() => {
    if (isCreate) {
      dispatch(reqIsCreate(false));
      notification.success({
        message: 'Create successful',
        description: '',
        placement: 'topRight',
      });
      props.history.push(PATH.CMS_THEMES);
    }
  }, [isCreate]);

  const onCancel = () => {
    props.history.push(PATH.CMS_THEMES);
  };

  const onSubmit = (dataForm) => {
    setData({...dataForm});
  };

  const onFinish = () => {
    data.styles = {};
    dispatch(createTheme(data));
  };

  const onDiscard = () => {
    props.history.push(PATH.CMS_THEMES);
  };

  return ACCESS.CREATE ? (
    <div>
      <Spin spinning={loading}>
        <ThemeForm
          onCancel={onCancel}
          onSubmit={onSubmit}
          onFinish={onFinish}
          onDiscard={onDiscard}
          isCreate={true}
        />
      </Spin>
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(ThemeCreate);
