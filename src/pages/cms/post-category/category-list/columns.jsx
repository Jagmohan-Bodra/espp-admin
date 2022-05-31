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

export const ACTIONS_KEY = {
  EDIT_POST: 'EDIT_POST',
  EDIT_OPTIMIZE_SEO: 'EDIT_OPTIMIZE_SEO',
  DELETE: 'DELETE',
};

const columns = (props) => {
  const {onSortChange, sortFilter, isEdit, isDelete} = props;
  return [
    {
      title: (
        <TextIcon
          leftComponent={trans('Category Name')}
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
      dataIndex: 'image',
      ellipsis: true,
      render: (text, data) => (
        <Image width="120px" src={(data.seoProps || {}).images} />
      ),
    },
    {
      title: trans('Status'),
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
        isEdit && {id: id, key: ACTIONS_KEY.EDIT_POST, name: 'Edit Category'},
        isEdit && {
          id: id,
          key: ACTIONS_KEY.EDIT_OPTIMIZE_SEO,
          name: 'Optimize SEO',
          obj,
        },
        isDelete && {id: id, key: ACTIONS_KEY.DELETE, name: 'Delete'},
      ]}
    />
  );
};

export default columns;
