import React from 'react';

import {trans} from '~/components/public/Translate';
import TextIcon from '~/components/public/cell/text-header/TextIcon';
import {
  getArrSortFilter,
  SortSwithIcon,
  findKeySort,
} from '~/helpers/queryString';

const columns = (props) => {
  const {onSortChange, sortFilter} = props;
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
      title: (
        <TextIcon
          leftComponent={trans('Email')}
          rightComponent={
            <SortSwithIcon
              column={`email`}
              value={findKeySort(sortFilter, `email`)}
            />
          }
        />
      ),
      dataIndex: 'email',
      ellipsis: true,
      render: (text) => text,
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'email')),
        };
      },
      className: `sort`,
    },
  ].filter((item) => item);
};

export default columns;
