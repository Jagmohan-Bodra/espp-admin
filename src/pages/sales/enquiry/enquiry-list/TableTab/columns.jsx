import React from 'react';
import {ButtonActions} from '~/components/public/Button';
import TextIcon from '~/components/public/cell/text-header/TextIcon';
import {formatDateMonth} from '~/helpers/date';
import {ENQUIRY_STATUS} from '~/constants/master-data';
import {
  getArrSortFilter,
  SortSwithIcon,
  findKeySort,
} from '~/helpers/queryString';
import {isEmpty} from '~/helpers/validate';

export const ACTIONS_KEY = {
  VIEW_ENQUIRY: 'VIEW_ENQUIRY',
};

const columns = (props) => {
  const {onSortChange, sortFilter, isView, isEdit} = props;
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
          leftComponent="Email"
          rightComponent={
            <SortSwithIcon
              column={`email`}
              value={findKeySort(sortFilter, `email`)}
            />
          }
        />
      ),
      dataIndex: 'email',
      render: (text) => text,
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'email')),
        };
      },
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent="Contact"
          rightComponent={
            <SortSwithIcon
              column={`contact`}
              value={findKeySort(sortFilter, `contact`)}
            />
          }
        />
      ),
      dataIndex: 'contact',
      render: (text) => text,
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'contact')),
        };
      },
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent="Message"
          rightComponent={
            <SortSwithIcon
              column={`message`}
              value={findKeySort(sortFilter, `message`)}
            />
          }
        />
      ),
      dataIndex: 'message',
      render: (text) => text,
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'message')),
        };
      },
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent="Product"
          rightComponent={
            <SortSwithIcon
              column={`product`}
              value={findKeySort(sortFilter, `product`)}
            />
          }
        />
      ),
      dataIndex: 'product',
      render: (text) => (text || {}).name,
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'product')),
        };
      },
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent="Date Created"
          rightComponent={
            <SortSwithIcon
              column={`phone`}
              value={findKeySort(sortFilter, `phone`)}
            />
          }
        />
      ),
      dataIndex: 'createdAt',
      render: (text) => formatDateMonth(text),
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'phone')),
        };
      },
      className: `sort`,
    },
    {
      title: (
        <TextIcon
          leftComponent="Status"
          rightComponent={
            <SortSwithIcon
              column={`status`}
              value={findKeySort(sortFilter, `status`)}
            />
          }
        />
      ),
      dataIndex: 'status',
      render: (text) =>
        !isEmpty(ENQUIRY_STATUS[text]) ? ENQUIRY_STATUS[text] : '',
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'status')),
        };
      },
      className: `sort`,
    },
    (isView || isEdit) && {
      title: 'Actions',
      dataIndex: '_id',
      align: 'center',
      width: 80,
      render: (id) => handleAction(id, props),
    },
  ].filter((item) => item);
};

const handleAction = (id, props) => {
  return (
    <ButtonActions
      onItem={props.onActionItem}
      data={[{id: id, key: ACTIONS_KEY.VIEW_ENQUIRY, name: 'View Enquiry'}]}
    />
  );
};

export default columns;
