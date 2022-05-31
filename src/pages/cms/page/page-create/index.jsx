import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Spin, notification, Empty} from 'antd';
import {createPage, reqIsCreate} from '~/reduxs/page/action';
import PagePropertiesForm from '../page-properties-form';
import PATH from '~/routers/path';
import {getThemeList} from '~/reduxs/theme/action';
import {SITE_ID_DEFAULT} from '~/config';
import {isAccess} from '~/helpers/utils';
import {CMS_PAGE_CREATE_PERMISSION_KEY} from '~/constants/permissions';

const PageCreate = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.page.loading);
  const isCreate = useSelector((state) => state.page.isCreate);
  const themeData = useSelector((state) => state.theme.data);
  const [data, setData] = useState({});
  const ACCESS = {
    CREATE: isAccess(CMS_PAGE_CREATE_PERMISSION_KEY),
  };

  useEffect(() => {
    dispatch(getThemeList({meta: {pageSize: 1000, page: 1}}));
  }, []);

  useEffect(() => {
    if (isCreate) {
      dispatch(reqIsCreate(false));
      notification.success({
        message: 'Create successful',
        description: '',
        placement: 'topRight',
      });
      props.history.push(PATH.CMS_PAGES);
    }
  }, [isCreate]);

  const onCancel = () => {
    props.history.push(PATH.CMS_PAGES);
  };

  const onSubmit = (dataForm) => {
    setData({...dataForm});
  };

  const onFinish = () => {
    data.styles = {};
    data.siteId = SITE_ID_DEFAULT;
    dispatch(createPage(data));
  };

  const onDiscard = () => {
    props.history.push(PATH.CMS_PAGES);
  };

  return ACCESS.CREATE ? (
    <div>
      <Spin spinning={loading}>
        <PagePropertiesForm
          onCancel={onCancel}
          onSubmit={onSubmit}
          onFinish={onFinish}
          onDiscard={onDiscard}
          isCreate={true}
          themeData={themeData}
        />
      </Spin>
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(PageCreate);
