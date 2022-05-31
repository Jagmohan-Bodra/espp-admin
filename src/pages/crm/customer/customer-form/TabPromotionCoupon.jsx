import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import TableData from '~/components/public/TableData';
import {ButtonActions} from '~/components/public/Button';
import {getPromotionList} from '~/reduxs/promotion/action';
import {PROMOTIONS_TYPE, PROMOTION_APPLYFOR} from '~/constants/master-data';
import {
  getQueryBuilder,
  getQueryString,
  getObjectIdFilter,
  stringify,
  changeUrlQuery,
  getPageFilter,
} from '~/helpers/queryString';
import {isEmpty} from '~/helpers/validate';
const cssClass = 'crm-customer-tab';

const TabFinance = (props) => {
  const query = getQueryString(props);
  const dispatch = useDispatch();
  const promotions = useSelector((state) => state.promotion.data);
  const metadata = useSelector((state) => state.promotion.metadata);
  const loading = useSelector((state) => state.promotion.loading);
  const {id} = props.match.params;

  useEffect(() => {
    let queryBuilder = getQueryBuilder(query) || {};
    delete queryBuilder.reset;
    queryBuilder.meta = {
      ...queryBuilder.meta,
      ...{sort: ['-_id']},
    };
    dispatch(
      getPromotionList({
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

  const total = promotions ? promotions.length : 0;
  return (
    <div className={`${cssClass} tab-promotion-coupon`}>
      <p>
        <strong>Total Coupon: {total}</strong>
      </p>
      <TableData
        data={promotions || []}
        columns={columns}
        metadata={metadata}
        loading={loading}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default withRouter(TabFinance);

const columns = () => {
  // const { firstName, lastName } = props.user || {};
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => text,
    },
    {
      title: 'Code',
      dataIndex: 'code',
      render: (text) => text,
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      render: (text) => text,
    },
    {
      title: 'Promotion Value',
      dataIndex: 'percentageValue',
      render: (text, data) => text || data.cashRebateValue,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      algin: 'center',
      render: (text) =>
        !isEmpty(PROMOTIONS_TYPE[text]) ? PROMOTIONS_TYPE[text] : '',
    },
    {
      title: 'Off for',
      dataIndex: 'applyFor',
      algin: 'center',
      render: (text) =>
        !isEmpty(PROMOTION_APPLYFOR[text]) ? PROMOTION_APPLYFOR[text] : '',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      render: (text) => text,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      render: (text) => text,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      algin: 'center',
      width: 80,
      render: (text) => text,
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      align: 'center',
      width: 80,
      render: (id) => (
        <ButtonActions
          onItem={() => {}}
          data={[{id: id, key: 'VIEW_COUPON', name: 'View Promotion Coupon'}]}
        />
      ),
    },
  ];
};
