import React from 'react';
import {ButtonActions} from '~/components/public/Button';
import TextIcon from '~/components/public/cell/text-header/TextIcon';
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
          leftComponent="Name"
          rightComponent={
            <SortSwithIcon
              column={`name`}
              value={findKeySort(sortFilter, `name`)}
            />
          }
        />
      ),
      ellipsis: true,
      render: (data) => data.name,
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'name')),
        };
      },
      className: `sort`,
    },
    {
      title: 'Discount Percent',
      dataIndex: 'discountPercent',
      ellipsis: true,
      align: 'center',
      render: (text) => text,
    },
    {
      title: (
        <TextIcon
          leftComponent="Description"
          rightComponent={
            <SortSwithIcon
              column={`description`}
              value={findKeySort(sortFilter, `description`)}
            />
          }
        />
      ),
      dataIndex: 'description',
      ellipsis: true,
      render: (text) => text,
      onHeaderCell: () => {
        return {
          onClick: () =>
            onSortChange(getArrSortFilter(sortFilter, 'description')),
        };
      },
      className: `sort`,
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
