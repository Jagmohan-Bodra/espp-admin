import React from 'react';
import {ButtonActions} from '~/components/public/Button';
import TextIcon from '~/components/public/cell/text-header/TextIcon';
import {
  getArrSortFilter,
  SortSwithIcon,
  findKeySort,
} from '~/helpers/queryString';

export const ACTIONS_KEY = {
  EDIT_POST: 'EDIT_USER',
  DELETE: 'DELETE',
};

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
      ellipsis: true,
      render: ({firstName, lastName}) => firstName + ' ' + lastName,
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
      dataIndex: 'email',
      render: (text) => text,
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'email')),
        };
      },
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent="Phone"
          rightComponent={
            <SortSwithIcon
              column={`phone`}
              value={findKeySort(sortFilter, `phone`)}
            />
          }
        />
      ),
      dataIndex: 'phone',
      render: (text) => text,
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'phone')),
        };
      },
      className: `sort`,
    },
    {
      title: 'User Group',
      dataIndex: 'userGroup',
      responsive: ['lg'],
      render: (userGroup) => userGroup && userGroup.name,
    },
    (isEdit || isDelete) && {
      title: 'Actions',
      dataIndex: '_id',
      align: 'center',
      width: 80,
      render: (id) => handleAction(id, props),
    },
  ].filter((item) => item);
};

const handleAction = (id, {onActionItem, isEdit, isDelete}) => {
  return (
    <ButtonActions
      onItem={onActionItem}
      data={[
        isEdit && {id: id, key: ACTIONS_KEY.EDIT_POST, name: 'Edit User'},
        isDelete && {id: id, key: ACTIONS_KEY.DELETE, name: 'Delete'},
      ].filter((item) => item)}
    />
  );
};

export default columns;
