import React from 'react';
import {Switch} from 'antd';
import {trans} from '~/components/public/Translate';
import TextIcon from '~/components/public/cell/text-header/TextIcon';
import {
  getArrSortFilter,
  SortSwithIcon,
  findKeySort,
} from '~/helpers/queryString';
import {ButtonActions} from '~/components/public/Button';

export const ACTIONS_KEY = {
  SETTING: 'SETTING',
  EDIT_THEME: 'EDIT_THEME',
};

const columns = (props) => {
  const {onSortChange, sortFilter, isEdit, isDelete} = props;
  return [
    {
      title: (
        <TextIcon
          leftComponent={trans('Theme Name')}
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
      title: trans('Description'),
      dataIndex: 'description',
      render: (text) => text,
    },
    {
      title: trans('Published'),
      dataIndex: 'pushlish',
      algin: 'center',
      render: (pushlish) => <Switch disabled checked={pushlish} />,
    },
    (isEdit || isDelete) && {
      title: trans('Actions'),
      align: 'center',
      width: 80,
      render: (item) => handleAction(item, props),
    },
  ].filter((item) => item);
};

const handleAction = (item, {onActionItem, isEdit}) => {
  if (item.groupCode == 'Basic') {
    return <span></span>;
  }
  const {_id} = item;
  return (
    <ButtonActions
      onItem={onActionItem}
      data={[
        isEdit && {id: _id, key: ACTIONS_KEY.SETTING, name: 'Setting'},
        isEdit && {id: _id, key: ACTIONS_KEY.EDIT_THEME, name: 'Edit theme'},
      ].filter((item) => item)}
    />
  );
};

export default columns;
