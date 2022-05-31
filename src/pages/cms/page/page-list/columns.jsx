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
import {PAGE_TYPE_OPTION} from '~/constants/master-data';

export const ACTIONS_KEY = {
  EDIT_UI: 'EDIT_UI',
  EDIT_PROPERTIES: 'EDIT_PROPERTIES',
  SEO_OPTIMIZE: 'SEO_OPTIMIZE',
};

const columns = (props) => {
  const {onSortChange, sortFilter, isEdit, isDelete} = props;
  return [
    {
      title: (
        <TextIcon
          leftComponent={trans('Page name')}
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
      title: trans('Page URL'),
      dataIndex: 'url',
      ellipsis: true,
      render: (text) => text,
    },
    {
      title: trans('Type'),
      dataIndex: 'type',
      ellipsis: true,
      render: (value) =>
        (PAGE_TYPE_OPTION.find((item) => item.key == value) || {}).value || '',
    },
    {
      title: trans('Theme'),
      dataIndex: 'theme',
      ellipsis: true,
      render: (theme) => (theme || {}).name || '',
    },
    {
      title: trans('Published'),
      dataIndex: 'pushlish',
      algin: 'center',
      render: (pushlish) => <Switch disabled checked={pushlish} />,
    },
    (isEdit || isDelete) && {
      title: trans('Actions'),
      dataIndex: '_id',
      align: 'center',
      width: 150,
      render: (id, obj) => handleAction(id, props, obj),
    },
  ].filter((item) => item);
};

const handleAction = (id, {onActionItem, isEdit}, obj) => {
  return (
    <ButtonActions
      onItem={onActionItem}
      data={[
        isEdit && {id: id, key: ACTIONS_KEY.EDIT_PROPERTIES, name: 'Setting'},
        isEdit && {id: id, key: ACTIONS_KEY.EDIT_UI, name: 'Edit Page'},
        isEdit && {
          id: id,
          key: ACTIONS_KEY.SEO_OPTIMIZE,
          name: 'SEO optimize',
          obj,
        },
      ].filter((item) => item)}
    />
  );
};

export default columns;
