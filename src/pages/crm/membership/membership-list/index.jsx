import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';

import columns from './columns';
import TableData from '~/components/public/TableData';
import Breadcrumb from '~/components/public/Breadcrumb';
import {ButtonBlue} from '~/components/public/Button';
import {Toolbox} from '~/components/public/Toolbox';
import {getMembershipList} from '~/reduxs/membership/action';
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
import DeleteModal from '../membership-delete';
import '../style.scss';
import {
  CRM_MEMBERSHIP_CREATE_PERMISSION_KEY,
  CRM_MEMBERSHIP_DELETE_PERMISSION_KEY,
  CRM_MEMBERSHIP_EDIT_PERMISSION_KEY,
  CRM_MEMBERSHIP_PERMISSION_KEY,
  CRM_MEMBERSHIP_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
import {Empty} from 'antd';

const MembershipList = (props) => {
  const query = getQueryString(props);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [obj, setObj] = useState({});
  const memberships = useSelector((state) => state.membership.data);
  const metadata = useSelector((state) => state.membership.metadata);
  const loading = useSelector((state) => state.membership.loading);
  const queryBuilder = getQueryBuilder(query) || {};
  const ACCESS = {
    LIST: isAccess(CRM_MEMBERSHIP_PERMISSION_KEY),
    VIEW: isAccess(CRM_MEMBERSHIP_VIEW_PERMISSION_KEY),
    CREATE: isAccess(CRM_MEMBERSHIP_CREATE_PERMISSION_KEY),
    EDIT: isAccess(CRM_MEMBERSHIP_EDIT_PERMISSION_KEY),
    DELETE: isAccess(CRM_MEMBERSHIP_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    delete queryBuilder.reset;
    dispatch(
      getMembershipList({
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
    });
  };

  const onSortChange = (sort) => {
    setFilterQueryData({
      ...getSortFilter(sort),
    });
  };

  const onActionItem = (action) => {
    if (action && action.key == 'EDIT') {
      props.history.push(PATH.CRM_MEMBERSHIP_UPDATE.replace(':id', action.id));
    }
    if (action && action.key == 'DELETE') {
      setObj(memberships.find((item) => item._id == action.id) || {});
      setVisible(true);
    }
  };

  const deleteSuccess = () => {
    setFilterQueryData();
  };
  return ACCESS.LIST ? (
    <div className="membership-list-page">
      <Breadcrumb data={[{name: 'Memberships', link: '#'}]} />
      <Toolbox>
        {ACCESS.CREATE && (
          <ButtonBlue
            text="Create"
            onClick={() => props.history.push(PATH.CRM_MEMBERSHIP_CREATE)}
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
        onActionItem={onActionItem}
        data={memberships}
        columns={columns}
        metadata={metadata}
        loading={loading}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        sortFilter={(queryBuilder.meta || {}).sort || []}
        path={PATH.CRM_MEMBERSHIP_UPDATE}
        isEdit={ACCESS.EDIT}
        isDelete={ACCESS.DELETE}
        isView={ACCESS.VIEW}
      />
      <DeleteModal
        obj={obj}
        visible={visible}
        setVisible={setVisible}
        onFinish={deleteSuccess}
      />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(MembershipList);
