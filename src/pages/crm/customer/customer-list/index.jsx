import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {isEmpty} from '~/helpers/validate';

import columns from './columns';
import TableData from '~/components/public/TableData';
import Breadcrumb from '~/components/public/Breadcrumb';
import {ButtonBlue, ButtonDropdownIcon} from '~/components/public/Button';
import {Toolbox} from '~/components/public/Toolbox';
import {
  getQueryString,
  getQueryBuilder,
  stringify,
  getPageFilter,
  changeUrlQuery,
  getSortFilter,
} from '~/helpers/queryString';
import {exportExcel} from '~/helpers/ExportExcel';
import FilterDropdown from '~/components/public/filter-dropdown';
import FilterLayout from './common/FilterLayout';
import {getCustomerList} from '~/reduxs/customer/action';
import {getMembershipList} from '~/reduxs/membership/action';
import {formatDateTimeDefault} from '~/helpers/date';
import PATH from '~/routers/path';
import '../style.scss';
import {
  CRM_CUSTOMER_CREATE_PERMISSION_KEY,
  CRM_CUSTOMER_DELETE_PERMISSION_KEY,
  CRM_CUSTOMER_EDIT_PERMISSION_KEY,
  CRM_CUSTOMER_PERMISSION_KEY,
  CRM_CUSTOMER_VIEW_PERMISSION_KEY,
} from '~/constants/permissions';
import {isAccess} from '~/helpers/utils';
import {Empty} from 'antd';

const cssClass = 'customer-list-page';

const CustomerList = (props) => {
  const query = getQueryString(props);
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.data);
  const memberships = useSelector((state) => state.membership.data);
  const metadata = useSelector((state) => state.customer.metadata);
  const loading = useSelector((state) => state.customer.loading);
  const queryBuilder = getQueryBuilder(query) || {};
  const ACCESS = {
    LIST: isAccess(CRM_CUSTOMER_PERMISSION_KEY),
    VIEW: isAccess(CRM_CUSTOMER_VIEW_PERMISSION_KEY),
    CREATE: isAccess(CRM_CUSTOMER_CREATE_PERMISSION_KEY),
    EDIT: isAccess(CRM_CUSTOMER_EDIT_PERMISSION_KEY),
    DELETE: isAccess(CRM_CUSTOMER_DELETE_PERMISSION_KEY),
  };

  useEffect(() => {
    dispatch(getMembershipList({meta: {pageSize: 1000}}));
  }, []);

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    queryBuilder.meta = {...queryBuilder.meta, ...{sort: ['-_id']}};
    delete queryBuilder.reset;
    dispatch(
      getCustomerList({
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

  const onCreate = () => {
    props.history.push(PATH.CRM_CUSTOMER_CREATE);
  };

  const onActionItem = (action) => {
    if (action && action.key == 'EDIT') {
      props.history.push(PATH.CRM_CUSTOMER_UPDATE.replace(':id', action.id));
    }
  };

  const onItemButton = (item) => {
    if (item.key == 'EXPORT_TO_CSV') {
      exportToCSV();
    }
  };

  const exportToCSV = async () => {
    let queryBuilder = getQueryBuilder(query) || {};
    queryBuilder.meta = {
      ...queryBuilder.meta,
      ...{sort: ['-_id']},
      pageSize: 1000,
    };
    delete queryBuilder.reset;
    await dispatch(getCustomerList({...queryBuilder})).then((dataEx) => {
      if (dataEx) {
        let i = 1;
        let dataExport = (dataEx.data || []).reduce((total, item) => {
          let user = item.user || {};
          let newTotal = total.concat([
            {
              'No.': i++,
              'Full Name':
                (user && user.firstName) + ' ' + (user && user.lastName),
              Email: user && user.email,
              Phone: user && user.phone,
              Membership: item.membership && item.membership.name,
              'Date Created':
                !isEmpty(item.createdAt) &&
                formatDateTimeDefault(item.createdAt),
              'Date Modified':
                !isEmpty(item.updatedAt) &&
                formatDateTimeDefault(item.updatedAt),
              'Last Login':
                !isEmpty(item.lastLogin) &&
                formatDateTimeDefault(item.lastLogin),
              Status: item.status,
            },
          ]);
          return newTotal;
        }, []);

        exportExcel('Espp_table_customers', dataExport, 'customers');
      }
    });
  };

  return ACCESS.LIST ? (
    <div className={`${cssClass} admin-customer-list`}>
      <Breadcrumb data={[{name: 'Customers', link: '#'}]} />

      <Toolbox className={cssClass}>
        <div className="group-button-create">
          {ACCESS.CREATE && <ButtonBlue text="Create" onClick={onCreate} />}

          <FilterDropdown
            overlay={
              <FilterLayout
                handleSearchSubmit={handleSearchSubmit}
                dataFilter={queryBuilder}
                memberships={memberships}
              />
            }
            className={`${cssClass}__btn_filter`}
          />
        </div>
        <ButtonDropdownIcon
          text={'Action'}
          data={[{key: 'EXPORT_TO_CSV', name: 'Export data'}]}
          onItem={onItemButton}
        />
        <div style={{width: '230px'}} />
      </Toolbox>

      <TableData
        onActionItem={onActionItem}
        data={customers}
        columns={columns}
        metadata={metadata}
        loading={loading}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        sortFilter={(queryBuilder.meta || {}).sort || []}
        path={PATH.CRM_CUSTOMER_UPDATE}
        isEdit={ACCESS.EDIT}
        isView={ACCESS.VIEW}
      />
    </div>
  ) : (
    <Empty />
  );
};

export default withRouter(CustomerList);
