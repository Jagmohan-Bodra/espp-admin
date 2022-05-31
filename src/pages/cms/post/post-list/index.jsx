import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  getPostDetail,
  getPostList,
  updatePost,
  reqIsUpdate,
} from '~/reduxs/post/action';
import TableData from '~/components/public/TableData';
import columns, {ACTIONS_KEY} from './columns';
import PATH from '~/routers/path';
import {META_DATA} from '~/config/index';
import {
  getQueryString,
  getQueryBuilder,
  stringify,
  getPageFilter,
  changeUrlQuery,
  getSortFilter,
} from '~/helpers/queryString';
import FilterDropdown from '~/components/public/filter-dropdown';
import FilterLayout from './common/FilterLayout';
import BreadcrumbBasic from '~/components/public/Breadcrumb';
import {Toolbox} from '~/components/public/Toolbox';
import {ButtonBlue} from '~/components/public/Button';
import DeleteModal from '../post-delete';
import {Empty, notification} from 'antd';
import {trans} from '~/components/public/Translate';
import OptimizeSeoModal from '~/components/public/optimize-seo';
import {isAccess} from '~/helpers/utils';
import {
  CMS_POST_CREATE_PERMISSION_KEY,
  CMS_POST_DELETE_PERMISSION_KEY,
  CMS_POST_EDIT_PERMISSION_KEY,
  CMS_POST_PERMISSION_KEY,
  CMS_POST_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';

const {PAGE_SIZE} = META_DATA.PAGINATION;
const cssClass = 'page_cms_page';

const PostList = (props) => {
  const query = getQueryString(props);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleSEO, setVisibleSEO] = useState(false);
  const [dataPost, setDataPost] = useState({});
  const dispatch = useDispatch();
  const data = useSelector((state) => state.post.data);
  const [id, setId] = useState({});
  const obj = useSelector((state) => state.post.obj);
  const meta = useSelector((state) => state.post.metadata);
  const loading = useSelector((state) => state.post.loading);
  const postIsUpdate = useSelector((state) => state.post.isUpdate);
  const ACCESS = {
    LIST: isAccess(CMS_POST_PERMISSION_KEY),
    VIEW: isAccess(CMS_POST_VIEW_PERMISSION_KEY),
    CREATE: isAccess(CMS_POST_CREATE_PERMISSION_KEY),
    EDIT: isAccess(CMS_POST_EDIT_PERMISSION_KEY),
    DELETE: isAccess(CMS_POST_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    if (postIsUpdate) {
      dispatch(reqIsUpdate(false));
      notification.success({message: trans('Update successfully')});
      setFilterQueryData({});
    }
  }, [postIsUpdate]);

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    delete queryBuilder.reset;
    dispatch(
      getPostList({
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
    if (action && action.key == ACTIONS_KEY.SETTING) {
      props.history.push(PATH.CMS_POSTS_UPDATE.replace(':id', action.id));
    }
    if (action && action.key == ACTIONS_KEY.EDIT_OPTIMIZE_SEO) {
      setVisibleSEO(true);
      setDataPost(action.obj);
    }
    if (action && action.key == 'DELETE') {
      setId(action.id);
      dispatch(getPostDetail(action.id));
      setVisibleDelete(true);
    }
  };

  const handleSeoPostSubmit = (idPost, data) => {
    dispatch(updatePost(idPost, {seoProps: data}));
  };

  const queryBuilder = getQueryBuilder(query) || {};

  const breadcrumbData = () => {
    return [
      {
        name: 'Posts',
        link: '#',
      },
    ];
  };

  return ACCESS.LIST ? (
    <div>
      <BreadcrumbBasic data={breadcrumbData()} />
      <Toolbox>
        {ACCESS.CREATE && (
          <ButtonBlue
            text="Create"
            onClick={() => props.history.push(PATH.CMS_POSTS_CREATE)}
          />
        )}
        <FilterDropdown
          overlay={
            <FilterLayout
              handleSearchSubmit={handleSearchSubmit}
              dataFilter={queryBuilder}
            />
          }
          className={`${cssClass}__btn_filter`}
        />
      </Toolbox>
      <TableData
        data={data || []}
        onActionItem={onActionItem}
        columns={columns}
        metadata={meta}
        loading={loading}
        pageSize={PAGE_SIZE}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        sortFilter={(queryBuilder.meta || {}).sort || []}
        path={PATH.CMS_POSTS_UPDATE}
        isEdit={ACCESS.EDIT}
        isDelete={ACCESS.DELETE}
        isView={ACCESS.VIEW}
      />
      <DeleteModal
        id={id}
        obj={obj}
        visible={visibleDelete}
        setVisible={setVisibleDelete}
        query={query}
      />
      <OptimizeSeoModal
        data={dataPost.seoProps || {}}
        idPage={dataPost._id}
        visible={visibleSEO}
        setVisible={setVisibleSEO}
        onSubmit={handleSeoPostSubmit}
      />
    </div>
  ) : (
    <Empty />
  );
};

export default PostList;
