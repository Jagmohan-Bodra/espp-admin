import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Empty, Spin} from 'antd';
import {getPageDetail, updatePage, reqIsUpdate} from '~/reduxs/page/action';
import {getThemeList} from '~/reduxs/theme/action';
import PagePropertiesForm from '../page-properties-form';
import ROUTE_PATH from '~/routers/path';
import {isAccess} from '~/helpers/utils';
import {
  CMS_PAGE_DELETE_PERMISSION_KEY,
  CMS_PAGE_EDIT_PERMISSION_KEY,
  CMS_PAGE_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';

const PageUpdateProperties = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.page.loading);
  const obj = useSelector((state) => state.page.obj);
  const themeData = useSelector((state) => state.theme.data);
  const isUpdate = useSelector((state) => state.page.isUpdate);
  const {id} = props.match.params;
  const [data, setData] = useState({});
  const ACCESS = {
    VIEW: isAccess(CMS_PAGE_VIEW_PERMISSION_KEY),
    EDIT: isAccess(CMS_PAGE_EDIT_PERMISSION_KEY),
    DELETE: isAccess(CMS_PAGE_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    dispatch(getPageDetail(id));
    dispatch(getThemeList({meta: {pageSize: 1000, page: 1}}));
  }, []);

  useEffect(() => {
    setData(obj);
  }, [obj]);

  useEffect(() => {
    if (isUpdate) {
      dispatch(reqIsUpdate(false));
      props.history.push(ROUTE_PATH.CMS_PAGES);
    }
  }, [isUpdate]);

  const onCancel = () => {
    props.history.push(ROUTE_PATH.CMS_PAGES);
  };

  const onSubmit = (dataForm) => {
    setData({...dataForm});
  };

  const onFinish = () => {
    dispatch(updatePage(id, data));
  };

  return ACCESS.VIEW || ACCESS.EDIT ? (
    <div>
      <Spin spinning={loading}>
        <PagePropertiesForm
          id={id}
          data={obj}
          onCancel={onCancel}
          onSubmit={onSubmit}
          onFinish={onFinish}
          themeData={themeData}
        />
      </Spin>
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(PageUpdateProperties);
