import React from 'react';
import {ButtonActions} from '~/components/public/Button';
import TextIcon from '~/components/public/cell/text-header/TextIcon';
import {
  getArrSortFilter,
  SortSwithIcon,
  findKeySort,
} from '~/helpers/queryString';
import {formatDateTimeDefault} from '~/helpers/date';
import {ORDERS_STATUS} from '~/constants/master-data';
import {isEmpty} from 'validate.js';

export const ACTIONS_KEY = {
  VIEW_ORDERS: 'VIEW_ORDERS',
};

const columns = (props) => {
  const {onSortChange, sortFilter, isView, isEdit} = props;
  return [
    {
      title: <TextIcon leftComponent="Order No." />,
      ellipsis: true,
      dataIndex: 'orderNo',
      render: (text) => text,
      className: `sort`,
    },
    {
      title: <TextIcon leftComponent="Order Date Time" />,
      dataIndex: 'orderDateTime',
      render: (text) => formatDateTimeDefault(text),
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent="Customer Name"
          rightComponent={
            <SortSwithIcon
              column={`name`}
              value={findKeySort(sortFilter, `name`)}
            />
          }
        />
      ),
      ellipsis: true,
      dataIndex: 'customer',
      render: (text) =>
        ((text || {}).user || {}).firstName +
        ' ' +
        ((text || {}).user || {}).lastName,
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'name')),
        };
      },
      className: `sort`,
    },
    {
      title: <TextIcon leftComponent="Customer Email" />,
      ellipsis: true,
      dataIndex: 'customer',
      render: (text) => (text || {}).user.email,
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent="Membership"
          rightComponent={
            <SortSwithIcon
              column={`memberShip`}
              value={findKeySort(sortFilter, `memberShip`)}
            />
          }
        />
      ),
      dataIndex: 'membership',
      render: (text) => (text || {}).name,
      onHeaderCell: () => {
        return {
          onClick: () =>
            onSortChange(getArrSortFilter(sortFilter, 'memberShip')),
        };
      },
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent="Amount (SGD)"
          rightComponent={
            <SortSwithIcon
              column={`amount`}
              value={findKeySort(sortFilter, `amount`)}
            />
          }
        />
      ),
      ellipsis: true,
      dataIndex: 'amount',
      render: (text) => text,
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'amount')),
        };
      },
      width: 100,
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent="Payment Option"
          rightComponent={
            <SortSwithIcon
              column={`payment`}
              value={findKeySort(sortFilter, `payment`)}
            />
          }
        />
      ),
      dataIndex: 'payment',
      render: (text) => text,
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'payment')),
        };
      },
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent="Shipping Location"
          rightComponent={
            <SortSwithIcon
              column={`shippingLocation`}
              value={findKeySort(sortFilter, `shippingLocation`)}
            />
          }
        />
      ),
      ellipsis: true,
      dataIndex: 'shippingLocation',
      render: (text) => text,
      onHeaderCell: () => {
        return {
          onClick: () =>
            onSortChange(getArrSortFilter(sortFilter, 'shippingLocation')),
        };
      },
      className: `sort`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      algin: 'center',
      width: 80,
      render: (text) =>
        !isEmpty(ORDERS_STATUS[text]) ? ORDERS_STATUS[text] : '',
    },
    (isView || isEdit) && {
      title: 'Actions',
      dataIndex: '_id',
      align: 'center',
      width: 100,
      render: (id) => handleAction(id, props),
    },
  ].filter((item) => item);
};

const handleAction = (id, props) => {
  return (
    <ButtonActions
      onItem={props.onActionItem}
      data={[{id: id, key: ACTIONS_KEY.VIEW_ORDERS, name: 'View Order'}]}
    />
  );
};

export default columns;
