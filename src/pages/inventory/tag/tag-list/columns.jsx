import React from 'react';
import {ButtonActions} from '~/components/public/Button';
import TextIcon from '~/components/public/cell/text-header/TextIcon';
import {CheckIcon, TimesIcon} from '~/public/assets/icon';
import {
  getArrSortFilter,
  SortSwithIcon,
  findKeySort,
} from '~/helpers/queryString';

const columns = (props) => {
  const {onSortChange, sortFilter, isEdit, isDelete} = props;
  return [
    {
      title: (
        <TextIcon
          leftComponent="Tag Name"
          rightComponent={
            <SortSwithIcon
              column={`name`}
              value={findKeySort(sortFilter, `name`)}
            />
          }
        />
      ),
      dataIndex: 'name',
      ellipsis: true,
      render: (text) => text,
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'name')),
        };
      },
      className: `sort`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      algin: 'center',
      render: (text) =>
        text === 'ENABLED' ? (
          <CheckIcon color="green" />
        ) : (
          <TimesIcon color="red" />
        ),
    },
    (isEdit || isDelete) && {
      title: 'Actions',
      dataIndex: '_id',
      align: 'center',
      width: 80,
      render: (id) => (
        <ButtonActions
          onItem={props.onActionItem}
          data={[
            isEdit && {id: id, key: 'EDIT', name: 'Edit'},
            isDelete && {id: id, key: 'DELETE', name: 'Delete'},
          ].filter((item) => item)}
        />
      ),
    },
  ].filter((item) => item);
};

export default columns;
