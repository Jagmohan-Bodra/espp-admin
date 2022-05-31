import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import TableData from '~/components/public/TableData';
import {columns} from './data';
import {getOrdersList} from '~/reduxs/orders/action';
import {
  getQueryString,
  getQueryBuilder,
  stringify,
  getPageFilter,
  changeUrlQuery,
  getObjectIdFilter,
} from '~/helpers/queryString';

const cssClass = 'crm-customer-tab';

const TabOrderHistory = (props) => {
  const query = getQueryString(props);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.data);
  const metadata = useSelector((state) => state.orders.metadata);
  const loading = useSelector((state) => state.orders.loading);
  const {id} = props.match.params;

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    delete queryBuilder.reset;
    queryBuilder.meta = {
      ...queryBuilder.meta,
      ...{sort: ['-_id']},
    };
    dispatch(
      getOrdersList({
        ...queryBuilder,
        ...getObjectIdFilter('customer', id),
      }),
    );
  }, [query]);

  const setFilterQueryData = (value = {}) => {
    const queryBuilder = getQueryBuilder(query) || {};
    const data = {
      ...queryBuilder,
      ...getObjectIdFilter('customer', id),
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

  const total = orders ? orders.length : 0;
  return (
    <div className={`${cssClass} tab-order-history`}>
      <p>
        <strong>Total Order: {total}</strong>
      </p>
      <TableData
        data={orders || []}
        columns={columns}
        metadata={metadata}
        loading={loading}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default withRouter(TabOrderHistory);
