import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Empty, notification} from 'antd';

import FilterDropdown from '~/components/public/filter-dropdown';
import FilterLayout from './common/FilterLayout';
import Breadcrumb from '~/components/public/Breadcrumb';
import {Toolbox} from '~/components/public/Toolbox';
import TableData from '~/components/public/TableData';

import {getPageList, updatePage, reqIsUpdate} from '~/reduxs/page/action';
import columns, {ACTIONS_KEY} from './columns';
import {
  getQueryString,
  getQueryBuilder,
  stringify,
  getPageFilter,
  changeUrlQuery,
  getSortFilter,
} from '~/helpers/queryString';
import PATH from '~/routers/path';
import {META_DATA} from '~/config';
import {trans} from '~/components/public/Translate';
import OptimizeSeoModal from '~/components/public/optimize-seo';
import {isAccess} from '~/helpers/utils';
import {
  CMS_PAGE_CREATE_PERMISSION_KEY,
  CMS_PAGE_DELETE_PERMISSION_KEY,
  CMS_PAGE_EDIT_PERMISSION_KEY,
  CMS_PAGE_PERMISSION_KEY,
  CMS_PAGE_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';

const {PAGE_SIZE} = META_DATA.PAGINATION;

const PageList = (props) => {
  const query = getQueryString(props);
  const [visibleSEO, setVisibleSEO] = useState(false);
  const [dataPgae, setDataPage] = useState({});
  const dispatch = useDispatch();
  const data = useSelector((state) => state.page.data);
  const meta = useSelector((state) => state.page.metadata);
  const loading = useSelector((state) => state.page.loading);
  const pageIsUpdate = useSelector((state) => state.page.isUpdate);
  const ACCESS = {
    LIST: isAccess(CMS_PAGE_PERMISSION_KEY),
    VIEW: isAccess(CMS_PAGE_VIEW_PERMISSION_KEY),
    CREATE: isAccess(CMS_PAGE_CREATE_PERMISSION_KEY),
    EDIT: isAccess(CMS_PAGE_EDIT_PERMISSION_KEY),
    DELETE: isAccess(CMS_PAGE_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    if (pageIsUpdate) {
      dispatch(reqIsUpdate(false));
      notification.success({message: trans('Update successfully')});
      setFilterQueryData({});
    }
  }, [pageIsUpdate]);

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    delete queryBuilder.reset;
    dispatch(
      getPageList({
        ...queryBuilder,
      }),
    );
  }, [query]);

  const setFilterQueryData = (value = {}) => {
    const queryBuilder = getQueryBuilder(query) || {};
    const data = {
      ...queryBuilder,
      ...value,
      meta: {
        ...(queryBuilder.meta || {}),
        ...(value.meta || {}),
      },
      reset: !(queryBuilder.reset === 'true'),
    };
    const queryParam = stringify(data);
    changeUrlQuery(props, queryParam);
  };

  const onPageChange = (page) => {
    setFilterQueryData({
      ...getPageFilter(page),
    });
  };

  const handleSearchSubmit = (params) => {
    setFilterQueryData({
      ...params,
      meta: {page: '1'},
    });
  };

  const onSortChange = (sort) => {
    setFilterQueryData({
      ...getSortFilter(sort),
    });
  };

  const onActionItem = (action) => {
    if (action && action.key == ACTIONS_KEY.EDIT_UI) {
      props.history.push(PATH.CMS_PAGES_UPDATE_UI.replace(':id', action.id));
    }
    if (action && action.key == ACTIONS_KEY.EDIT_PROPERTIES) {
      props.history.push(
        PATH.CMS_PAGES_UPDATE_PROPERTIES.replace(':id', action.id),
      );
    }
    if (action && action.key == ACTIONS_KEY.SEO_OPTIMIZE) {
      setVisibleSEO(true);
      setDataPage(action.obj);
    }
  };

  const handleSeoPageSubmit = (idPage, data) => {
    dispatch(updatePage(idPage, {seoProps: data}));
  };

  const getBreadcrumb = () => {
    return [{name: 'Pages', link: '#'}];
  };

  const queryBuilder = getQueryBuilder(query) || {};

  return ACCESS.LIST ? (
    <div>
      <Breadcrumb data={getBreadcrumb()} />
      <Toolbox>
        <FilterDropdown
          overlay={
            <FilterLayout
              handleSearchSubmit={handleSearchSubmit}
              dataFilter={queryBuilder}
            />
          }
          className={`cms-page__btn_filter`}
        />
      </Toolbox>
      <TableData
        onActionItem={onActionItem}
        data={data || []}
        columns={columns}
        metadata={meta}
        loading={loading}
        pageSize={PAGE_SIZE}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        sortFilter={(queryBuilder.meta || {}).sort || []}
        path={PATH.CMS_PAGES_UPDATE_UI}
        isEdit={ACCESS.EDIT}
        isDelete={ACCESS.DELETE}
        isView={ACCESS.VIEW}
      />
      <OptimizeSeoModal
        data={dataPgae.seoProps || {}}
        idPage={dataPgae._id}
        visible={visibleSEO}
        setVisible={setVisibleSEO}
        onSubmit={handleSeoPageSubmit}
      />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(PageList);
