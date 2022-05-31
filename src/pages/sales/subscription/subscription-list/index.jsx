import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Breadcrumb from '~/components/public/Breadcrumb';
import {Toolbox} from '~/components/public/Toolbox';
import {
  getQueryString,
  getQueryBuilder,
  stringify,
  getPageFilter,
  changeUrlQuery,
  getSortFilter,
} from '~/helpers/queryString';
import columns from './columns';
import {META_DATA} from '~/config';
import '../../style.scss';
import QuickFilterDropdown, {
  TYPE,
} from '~/components/public/quick-filter-dropdown';
import TableData from '~/components/public/TableData';
import {getSubscriptionList} from '~/reduxs/subscription/action';
const {PAGE_SIZE} = META_DATA.PAGINATION;

const cssClass = 'subscription-list-page';

const SubscriptionList = (props) => {
  const query = getQueryString(props);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.subscription.data);
  const meta = useSelector((state) => state.subscription.metadata);
  const loading = useSelector((state) => state.subscription.loading);
  const queryBuilder = getQueryBuilder(query) || {};

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    delete queryBuilder.reset;
    dispatch(
      getSubscriptionList({
        meta: {pageSize: PAGE_SIZE, page: 1},
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

  const onSortChange = (sort) => {
    setFilterQueryData({
      ...getSortFilter(sort),
    });
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

  return (
    <div className={`${cssClass}`}>
      <Breadcrumb data={[{name: 'Orders', link: '#'}]} />
      <Toolbox className={cssClass}>
        <div className={`${cssClass}__button-left`}>
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
                key: 'email',
                text: 'Email',
                type: TYPE.INPUT,
              },
            ]}
          />
        </div>
      </Toolbox>
      <TableData
        data={data || []}
        columns={columns}
        metadata={meta}
        loading={loading}
        pageSize={PAGE_SIZE}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
        sortFilter={(queryBuilder.meta || {}).sort || []}
      />
    </div>
  );
};

export default withRouter(SubscriptionList);
