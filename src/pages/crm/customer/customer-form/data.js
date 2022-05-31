import React from 'react';

import {ButtonEyesIcon} from '~/public/assets/icon';
import {formatDateTimeDefault} from '~/helpers/date';
import {isEmpty} from '~/helpers/validate';
import PATH from '~/routers/path';

export const TABS = [
  {
    key: 'GENERAL_INFORMATION',
    value: 'General Information',
  },
  {
    key: 'ADDRESS',
    value: 'Address',
  },
  {
    key: 'COMPANY_INFORMATION',
    value: 'Company Information',
  },
  {
    key: 'FINANCE',
    value: 'Finance',
  },
  {
    key: 'ORDER_HISTORY',
    value: 'Order History',
  },
  {
    key: 'INTERNAL_NOTES',
    value: 'Internal Notes',
  },
  {
    key: 'PROMOTION_COUPON',
    value: 'Promotion Coupon',
  },
];

export const columns = (props) => {
  return [
    {
      title: 'Order No.',
      dataIndex: 'orderNo',
      ellipsis: true,
      width: 110,
      render: (text) => text,
    },
    {
      title: 'Order Date Time',
      dataIndex: 'orderDateTime',
      render: (text) => !isEmpty(text) && formatDateTimeDefault(text),
    },
    {
      title: 'Membership',
      dataIndex: 'membership',
      render: (membership) => membership && membership.name,
    },
    {
      title: 'Amount (SGD)',
      dataIndex: 'amount',
      render: (text) => text,
    },
    {
      title: 'Payment Option',
      dataIndex: 'paymentOption',
      render: (text) => text,
    },
    {
      title: 'Shipping Location',
      dataIndex: 'shippingLocation',
      algin: 'center',
      render: (text) => text,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      algin: 'center',
      render: (text) => text,
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      align: 'center',
      width: 80,
      render: (id) => (
        <ButtonEyesIcon
          onClick={() =>
            props.history.push(PATH.SALES_ORDERS_UPDATE.replace(':id', id))
          }
          title="View order"
          className="btn-click"
        />
      ),
    },
  ];
};
