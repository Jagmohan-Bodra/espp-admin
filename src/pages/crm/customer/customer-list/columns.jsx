import React from 'react';
import {ButtonActions} from '~/components/public/Button';
import TextIcon from '~/components/public/cell/text-header/TextIcon';
import {
  getArrSortFilter,
  SortSwithIcon,
  findKeySort,
} from '~/helpers/queryString';
import {formatDateTimeDefault} from '~/helpers/date';
import {CUSTOMER_STATUS} from '~/constants/master-data';
import {isEmpty} from '~/helpers/validate';
const columns = (props) => {
  const {onSortChange, sortFilter, isEdit, isDelete} = props;
  return [
    {
      title: (
        <TextIcon
          leftComponent="Full Name"
          rightComponent={
            <SortSwithIcon
              column={`firstName`}
              value={findKeySort(sortFilter, `firstName`)}
            />
          }
        />
      ),
      dataIndex: 'user',
      ellipsis: true,
      render: (user) =>
        (user && user.firstName) + ' ' + (user && user.lastName),
      onHeaderCell: () => {
        return {
          onClick: () =>
            onSortChange(getArrSortFilter(sortFilter, 'firstName')),
        };
      },
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent="Email"
          rightComponent={
            <SortSwithIcon
              column={`email`}
              value={findKeySort(sortFilter, `email`)}
            />
          }
        />
      ),
      dataIndex: 'user',
      render: (user) => user && user.email,
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'email')),
        };
      },
      className: `sort`,
    },
    {
      title: 'Membership',
      dataIndex: 'membership',
      responsive: ['lg'],
      render: (membership) => membership && membership.name,
    },
    {
      title: (
        <TextIcon
          leftComponent="Date Created"
          rightComponent={
            <SortSwithIcon
              column={`createdAt`}
              value={findKeySort(sortFilter, `createdAt`)}
            />
          }
        />
      ),
      dataIndex: 'createdAt',
      render: (text) => !isEmpty(text) && formatDateTimeDefault(text),
      onHeaderCell: () => {
        return {
          onClick: () =>
            onSortChange(getArrSortFilter(sortFilter, 'createdAt')),
        };
      },
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent="Date Modified"
          rightComponent={
            <SortSwithIcon
              column={`updatedAt`}
              value={findKeySort(sortFilter, `updatedAt`)}
            />
          }
        />
      ),
      dataIndex: 'updatedAt',
      render: (text) => !isEmpty(text) && formatDateTimeDefault(text),
      onHeaderCell: () => {
        return {
          onClick: () =>
            onSortChange(getArrSortFilter(sortFilter, 'updatedAt')),
        };
      },
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent="Last Login"
          rightComponent={
            <SortSwithIcon
              column={`lastLogin`}
              value={findKeySort(sortFilter, `lastLogin`)}
            />
          }
        />
      ),
      dataIndex: 'lastLogin',
      render: (text) => !isEmpty(text) && formatDateTimeDefault(text),
      onHeaderCell: () => {
        return {
          onClick: () =>
            onSortChange(getArrSortFilter(sortFilter, 'lastLogin')),
        };
      },
      className: `sort`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      algin: 'center',
      render: (text) => text && renderStatus(text),
    },
    (isEdit || isDelete) && {
      title: 'Actions',
      dataIndex: '_id',
      align: 'center',
      width: 80,
      render: (id) => (
        <ButtonActions
          onItem={props.onActionItem}
          data={[isEdit && {id: id, key: 'EDIT', name: 'Edit'}].filter(
            (item) => item,
          )}
        />
      ),
    },
  ];
};

export default columns;

const renderStatus = (status) => {
  if (status === CUSTOMER_STATUS.ACTIVE.toUpperCase()) {
    return <span style={{color: '#52c41a'}}>{CUSTOMER_STATUS[status]}</span>;
  }
  if (status === CUSTOMER_STATUS.PENDING.toUpperCase()) {
    return <span style={{color: 'orange'}}>{CUSTOMER_STATUS[status]}</span>;
  }
  if (status === CUSTOMER_STATUS.SUSPEND.toUpperCase()) {
    return <span style={{color: 'red'}}>{CUSTOMER_STATUS[status]}</span>;
  }
};
