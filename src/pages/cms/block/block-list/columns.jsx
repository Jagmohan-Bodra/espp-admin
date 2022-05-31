import React from 'react';
import {Image} from 'antd';

import {trans} from '~/components/public/Translate';
import TextIcon from '~/components/public/cell/text-header/TextIcon';
import {CheckIcon, TimesIcon} from '~/public/assets/icon';
import {
  getArrSortFilter,
  SortSwithIcon,
  findKeySort,
} from '~/helpers/queryString';
import {ButtonActions} from '~/components/public/Button';
import {BLOCK_STATUS, BLOCK_TYPE_OPTION} from '~/constants/master-data';

export const ACTIONS_KEY = {
  SETTING: 'SETTING',
  EDIT_POST: 'EDIT_BLOCK',
  DELETE: 'DELETE',
};

const columns = (props) => {
  const {onSortChange, sortFilter, isEdit, isDelete} = props;
  return [
    {
      title: (
        <TextIcon
          leftComponent={trans('Block Name')}
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
      title: trans('Image'),
      dataIndex: 'avatar',
      ellipsis: true,
      render: (text) => <Image width="60px" src={text} />,
    },
    {
      title: trans('Type'),
      dataIndex: 'type',
      ellipsis: true,
      render: (value) =>
        (BLOCK_TYPE_OPTION.find((item) => item.key === value) || {}).value ||
        '',
    },
    {
      title: trans('Status'),
      dataIndex: 'status',
      algin: 'center',
      render: (text) =>
        text === BLOCK_STATUS.ENABLED ? (
          <CheckIcon color="green" />
        ) : (
          <TimesIcon color="red" />
        ),
    },
    (isEdit || isDelete) && {
      title: trans('Actions'),
      align: 'center',
      width: 80,
      render: (item) => handleAction(item, props),
    },
  ].filter((item) => item);
};

const handleAction = (item, {onActionItem, isEdit, isDelete}) => {
  if (item.groupCode == 'Basic') {
    return <span></span>;
  }
  const {_id} = item;
  return (
    <ButtonActions
      onItem={onActionItem}
      data={[
        isEdit && {id: _id, key: ACTIONS_KEY.SETTING, name: 'Setting'},
        isEdit && {id: _id, key: ACTIONS_KEY.EDIT_POST, name: 'Edit Block'},
        isDelete && {id: _id, key: ACTIONS_KEY.DELETE, name: 'Delete'},
      ].filter((item) => item)}
    />
  );
};

export default columns;
