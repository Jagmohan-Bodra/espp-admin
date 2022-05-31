import React from 'react';

import {trans} from '~/components/public/Translate';
import TextIcon from '~/components/public/cell/text-header/TextIcon';
import {
  getArrSortFilter,
  SortSwithIcon,
  findKeySort,
} from '~/helpers/queryString';
import {ButtonActions} from '~/components/public/Button';
import {CheckIcon, TimesIcon} from '~/public/assets/icon';
import {formatDate} from '~/helpers/date';
import {isEmpty} from '~/helpers/validate';
import {PROMOTIONS_TYPE, PROMOTION_APPLYFOR} from '~/constants/master-data';
export const ACTIONS_KEY = {
  EDIT_PROMOTIONS: 'EDIT_PROMOTIONS',
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
      title: (
        <TextIcon
          leftComponent={trans('Code')}
          rightComponent={
            <SortSwithIcon
              column={`code`}
              value={findKeySort(sortFilter, `code`)}
            />
          }
        />
      ),
      dataIndex: 'code',
      ellipsis: true,
      render: (text) => text,
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'code')),
        };
      },
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent={trans('Coupon Limit')}
          rightComponent={
            <SortSwithIcon
              column={`couponLimit`}
              value={findKeySort(sortFilter, `couponLimit`)}
            />
          }
        />
      ),
      dataIndex: 'couponLimit',
      ellipsis: true,
      render: (text) => text,
      onHeaderCell: () => {
        return {
          onClick: () =>
            onSortChange(getArrSortFilter(sortFilter, 'couponLimit')),
        };
      },
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent={trans('Capacity')}
          rightComponent={
            <SortSwithIcon
              column={`capacity`}
              value={findKeySort(sortFilter, `capacity`)}
            />
          }
        />
      ),
      dataIndex: 'capacity',
      ellipsis: true,
      render: (text) => text,
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'capacity')),
        };
      },
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent={trans('Value')}
          rightComponent={
            <SortSwithIcon
              column={`percentageValue`}
              value={findKeySort(sortFilter, `percentageValue`)}
            />
          }
        />
      ),
      dataIndex: 'percentageValue',
      ellipsis: true,
      render: (text, data) => text || data.cashRebateValue,
      onHeaderCell: () => {
        return {
          onClick: () =>
            onSortChange(getArrSortFilter(sortFilter, 'percentageValue')),
        };
      },
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent={trans('Type')}
          rightComponent={
            <SortSwithIcon
              column={`type`}
              value={findKeySort(sortFilter, `type`)}
            />
          }
        />
      ),
      dataIndex: 'type',
      ellipsis: true,
      render: (text) =>
        !isEmpty(PROMOTIONS_TYPE[text]) ? PROMOTIONS_TYPE[text] : '',
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'type')),
        };
      },
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent={trans('Off for')}
          rightComponent={
            <SortSwithIcon
              column={`applyFor`}
              value={findKeySort(sortFilter, `applyFor`)}
            />
          }
        />
      ),
      dataIndex: 'applyFor',
      ellipsis: true,
      render: (text) =>
        !isEmpty(PROMOTION_APPLYFOR[text]) ? PROMOTION_APPLYFOR[text] : '',
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'applyFor')),
        };
      },
      className: `sort`,
    },
    {
      title: trans('Start Date'),
      dataIndex: 'startDate',
      ellipsis: true,
      render: (text) => formatDate(text),
      className: `sort`,
    },
    {
      title: trans('End Date'),
      dataIndex: 'endDate',
      ellipsis: true,
      render: (text) => formatDate(text),
      className: `sort`,
    },
    {
      title: trans('Status'),
      dataIndex: 'status',
      algin: 'center',
      width: 80,
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

const handleAction = (id, {onActionItem, isEdit, isDelete}) => {
  return (
    <ButtonActions
      onItem={onActionItem}
      data={[
        isEdit && {
          id: id,
          key: ACTIONS_KEY.EDIT_PROMOTIONS,
          name: 'Edit Promotion',
        },
        isDelete && {id: id, key: ACTIONS_KEY.DELETE, name: 'Delete'},
      ].filter((item) => item)}
    />
  );
};

export default columns;
