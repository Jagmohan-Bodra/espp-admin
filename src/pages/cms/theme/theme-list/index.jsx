import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import BreadcrumbBasic from '~/components/public/Breadcrumb';
import {Toolbox} from '~/components/public/Toolbox';
import {getThemeList} from '~/reduxs/theme/action';
import QuickFilterDropdown, {
  TYPE,
} from '~/components/public/quick-filter-dropdown';
import {isAccess} from '~/helpers/utils';
import {
  CMS_THEME_CREATE_PERMISSION_KEY,
  CMS_THEME_DELETE_PERMISSION_KEY,
  CMS_THEME_EDIT_PERMISSION_KEY,
  CMS_THEME_PERMISSION_KEY,
  CMS_THEME_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {Empty} from 'antd';

const {PAGE_SIZE} = META_DATA.PAGINATION;

const ThemeList = (props) => {
  const query = getQueryString(props);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.theme.data);
  const meta = useSelector((state) => state.theme.metadata);
  const loading = useSelector((state) => state.theme.loading);
  const queryBuilder = getQueryBuilder(query) || {};
  const ACCESS = {
    LIST: isAccess(CMS_THEME_PERMISSION_KEY),
    VIEW: isAccess(CMS_THEME_VIEW_PERMISSION_KEY),
    CREATE: isAccess(CMS_THEME_CREATE_PERMISSION_KEY),
    EDIT: isAccess(CMS_THEME_EDIT_PERMISSION_KEY),
    DELETE: isAccess(CMS_THEME_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    delete queryBuilder.reset;
    dispatch(
      getThemeList({
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

  const breadcrumbData = () => {
    return [
      {
        name: 'Themes',
        link: '#',
      },
    ];
  };

  const onActionItem = (action) => {
    if (action && action.key == ACTIONS_KEY.EDIT_THEME) {
      props.history.push(PATH.CMS_THEMES_UPDATE_UI.replace(':id', action.id));
    }
    if (action && action.key === ACTIONS_KEY.SETTING) {
      props.history.push(PATH.CMS_THEMES_UPDATE.replace(':id', action.id));
    }
  };

  return ACCESS.LIST ? (
    <div>
      <BreadcrumbBasic data={breadcrumbData()} />
      <Toolbox>
        <QuickFilterDropdown
          dataFilter={queryBuilder}
          handleSearchSubmit={handleSearchSubmit}
          options={[
            {
              key: 'name',
              text: 'Name',
              type: TYPE.INPUT,
            },
            {
              key: 'description',
              text: 'Description',
              type: TYPE.INPUT,
            },
            {
              key: 'pushlish',
              text: 'Published',
              type: TYPE.SELECT,
              options: [
                {
                  key: '1',
                  value: 'True',
                },
                {
                  key: '0',
                  value: 'False',
                },
              ],
            },
          ]}
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
        path={PATH.CMS_THEMES_UPDATE_UI}
        isEdit={ACCESS.EDIT}
        isDelete={ACCESS.DELETE}
        isView={ACCESS.VIEW}
      />
    </div>
  ) : (
    <Empty />
  );
};

export default ThemeList;
