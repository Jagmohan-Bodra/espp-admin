import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import columns from './columns';
import TableData from '~/components/public/TableData';
import Breadcrumb from '~/components/public/Breadcrumb';
import {ButtonBlue} from '~/components/public/Button';
import {Toolbox} from '~/components/public/Toolbox';
import {getRoleDetail, getRoleList} from '~/reduxs/role/action';
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
import PATH from '~/routers/path';
import '../style.scss';
import {META_DATA} from '~/config';
import DeleteModal from '../role-delete';
import {
  USER_ROLE_CREATE_PERMISSION_KEY,
  USER_ROLE_DELETE_PERMISSION_KEY,
  USER_ROLE_EDIT_PERMISSION_KEY,
  USER_ROLE_PERMISSION_KEY,
  USER_ROLE_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
import {Empty} from 'antd';

const {PAGE_SIZE} = META_DATA.PAGINATION;
const breadcrumbs = [
  {
    name: 'Roles',
    link: '#',
  },
];

const RoleList = (props) => {
  const query = getQueryString(props);
  const dispatch = useDispatch();
  const [visibleDelete, setVisibleDelete] = useState(false);
  const data = useSelector((state) => state.role.data);
  const meta = useSelector((state) => state.role.metadata);
  const loading = useSelector((state) => state.role.loading);
  const queryBuilder = getQueryBuilder(query) || {};
  const [id, setId] = useState({});
  const obj = useSelector((state) => state.role.obj);
  const ACCESS = {
    LIST: isAccess(USER_ROLE_PERMISSION_KEY),
    VIEW: isAccess(USER_ROLE_VIEW_PERMISSION_KEY),
    CREATE: isAccess(USER_ROLE_CREATE_PERMISSION_KEY),
    EDIT: isAccess(USER_ROLE_EDIT_PERMISSION_KEY),
    DELETE: isAccess(USER_ROLE_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    delete queryBuilder.reset;
    dispatch(
      getRoleList({
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
    if (action && action.key == 'EDIT_ROLE') {
      props.history.push(PATH.ADMIN_ROLE_UPDATE.replace(':id', action.id));
    }
    if (action && action.key == 'DELETE') {
      setId(action.id);
      dispatch(getRoleDetail(action.id));
      setVisibleDelete(true);
    }
  };

  return ACCESS.LIST ? (
    <div className="role-list-page">
      <Breadcrumb data={breadcrumbs} />
      <Toolbox>
        {ACCESS.CREATE && (
          <ButtonBlue
            text="Create"
            onClick={() => props.history.push(PATH.ADMIN_ROLE_CREATE)}
          />
        )}
        <FilterDropdown
          overlay={
            <FilterLayout
              handleSearchSubmit={handleSearchSubmit}
              dataFilter={queryBuilder}
            />
          }
          className="btn_filter"
        />
      </Toolbox>

      <TableData
        data={data}
        onActionItem={onActionItem}
        columns={columns}
        metadata={meta}
        loading={loading}
        pageSize={PAGE_SIZE}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        sortFilter={(queryBuilder.meta || {}).sort || []}
        path={PATH.ADMIN_ROLE_UPDATE}
        isEdit={ACCESS.EDIT}
        isDelete={ACCESS.DELETE}
        isView={ACCESS.VIEW}
      />
      <DeleteModal
        id={id}
        obj={obj}
        visible={visibleDelete}
        setVisible={setVisibleDelete}
      />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(RoleList);
