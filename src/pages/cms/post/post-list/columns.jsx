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
  EDIT_OPTIMIZE_SEO: 'EDIT_OPTIMIZE_SEO',
  DELETE: 'DELETE',
};

const columns = (props) => {
  const {onSortChange, sortFilter, isEdit, isDelete} = props;
  return [
    {
      title: (
        <TextIcon
          leftComponent={trans('Name')}
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
      title: trans('URL'),
      dataIndex: 'url',
      ellipsis: true,
      render: (text) => text,
    },
    {
      title: trans('Published'),
      dataIndex: 'pushlish',
      algin: 'center',
      render: (text) => <Switch disabled={true} checked={text} />,
    },
    (isEdit || isDelete) && {
      title: trans('Actions'),
      dataIndex: '_id',
      align: 'center',
      width: 80,
      render: (id, obj) => handleAction(id, props, obj),
    },
  ].filter((item) => item);
};

const handleAction = (id, {onActionItem, isEdit, isDelete}, obj) => {
  return (
    <ButtonActions
      onItem={onActionItem}
      data={[
        isEdit && {id: id, key: ACTIONS_KEY.SETTING, name: 'Setting'},
        isEdit && {
          id: id,
          key: ACTIONS_KEY.EDIT_OPTIMIZE_SEO,
          name: 'Optimize SEO',
          obj,
        },
        isDelete && {id: id, key: ACTIONS_KEY.DELETE, name: 'Delete'},
      ].filter((item) => item)}
    />
  );
};

export default columns;
