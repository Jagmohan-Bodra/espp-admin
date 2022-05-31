import React from 'react';
import {ButtonActions} from '~/components/public/Button';
import TextIcon from '~/components/public/cell/text-header/TextIcon';
import {
  getArrSortFilter,
  SortSwithIcon,
  findKeySort,
} from '~/helpers/queryString';

export const ACTIONS_KEY = {
  EDIT_POST: 'EDIT_ROLE',
  DELETE: 'DELETE',
};

const columns = (props) => {
  const {onSortChange, sortFilter, isEdit, isDelete} = props;
  return [
    {
      title: (
        <TextIcon
          leftComponent="Role"
          rightComponent={
            <SortSwithIcon
              column={`name`}
              value={findKeySort(sortFilter, `name`)}
            />
          }
        />
      ),
      render: (data) => data.name,
      ellipsis: true,
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'name')),
        };
      },
      className: `sort`,
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
      render: (id) => handleAction(id, props),
    },
  ].filter((item) => item);
};

const handleAction = (id, {onActionItem, isEdit, isDelete}) => {
  return (
    <ButtonActions
      onItem={onActionItem}
      data={[
        isEdit && {id: id, key: ACTIONS_KEY.EDIT_POST, name: 'Edit Role'},
        isDelete && {id: id, key: ACTIONS_KEY.DELETE, name: 'Delete'},
      ].filter((item) => item)}
    />
  );
};

export default columns;
