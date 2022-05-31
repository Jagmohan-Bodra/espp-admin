import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import columns from './columns';
import TableData from '~/components/public/TableData';
import Breadcrumb from '~/components/public/Breadcrumb';
import {ButtonBlue} from '~/components/public/Button';
import {Toolbox} from '~/components/public/Toolbox';

import {getUserDetail, getUserList} from '~/reduxs/user/action';
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
import DeleteModal from '../user-delete';
import {
  USER_CREATE_PERMISSION_KEY,
  USER_DELETE_PERMISSION_KEY,
  USER_EDIT_PERMISSION_KEY,
  USER_PERMISSION_KEY,
  USER_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {Empty} from 'antd';
import {isAccess} from '~/helpers/utils';
const {PAGE_SIZE} = META_DATA.PAGINATION;
const cssClass = 'user-list-page';
const queryOtherCustomer = {userGroup: {name: {nin: ['customer']}}};

const UserList = (props) => {
  const query = getQueryString(props);
  const dispatch = useDispatch();
  const [visibleDelete, setVisibleDelete] = useState(false);
  const data = useSelector((state) => state.user.data);
  const meta = useSelector((state) => state.user.metadata);
  const loading = useSelector((state) => state.user.loading);
  const queryBuilder = getQueryBuilder(query) || {};
  const [id, setId] = useState({});
  const obj = useSelector((state) => state.user.obj);
  const ACCESS = {
    LIST: isAccess(USER_PERMISSION_KEY),
    VIEW: isAccess(USER_VIEW_PERMISSION_KEY),
    CREATE: isAccess(USER_CREATE_PERMISSION_KEY),
    EDIT: isAccess(USER_EDIT_PERMISSION_KEY),
    DELETE: isAccess(USER_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    delete queryBuilder.reset;
    dispatch(
      getUserList({
        ...queryOtherCustomer,
        ...queryBuilder,
      }),
    );
  }, [query]);

  const setFilterQueryData = (value = {}) => {
    const data = {
      ...queryOtherCustomer,
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
    if (action && action.key == 'EDIT_USER') {
      props.history.push(PATH.ADMIN_USER_UPDATE.replace(':id', action.id));
    }
    if (action && action.key == 'DELETE') {
      setId(action.id);
      dispatch(getUserDetail(action.id));
      setVisibleDelete(true);
    }
  };

  return ACCESS.LIST ? (
    <div className={`${cssClass} admin-user-list`}>
      <Breadcrumb data={[{name: 'Users', link: '#'}]} />
      <Toolbox>
        {ACCESS.CREATE && (
          <ButtonBlue
            text="Create"
            onClick={() => props.history.push(PATH.ADMIN_USER_CREATE)}
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
        data={data}
        onActionItem={onActionItem}
        columns={columns}
        metadata={meta}
        loading={loading}
        pageSize={PAGE_SIZE}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        sortFilter={(queryBuilder.meta || {}).sort || []}
        path={PATH.ADMIN_USER_UPDATE}
        isEdit={ACCESS.EDIT}
        isDelete={ACCESS.DELETE}
        isView={ACCESS.VIEW}
      />
      <DeleteModal
        id={id}
        obj={obj}
        visible={visibleDelete}
        setVisible={setVisibleDelete}
        query={queryBuilder}
      />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(UserList);
