import React from 'react';
import {Avatar} from 'antd';
import {ButtonActions} from '~/components/public/Button';
import TextIcon from '~/components/public/cell/text-header/TextIcon';
import {CheckIcon, TimesIcon} from '~/public/assets/icon';
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
          leftComponent="SKU"
          rightComponent={
            <SortSwithIcon
              column={`sku`}
              value={findKeySort(sortFilter, `sku`)}
            />
          }
        />
      ),
      dataIndex: 'sku',
      ellipsis: true,
      render: (text) => text,
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'sku')),
        };
      },
      className: `sort`,
    },
    {
      title: 'Image',
      dataIndex: 'imageFullPaths',
      render: (images) =>
        images &&
        images[0] && <Avatar shape="square" size={40} src={images[0]} />,
    },
    {
      title: (
        <TextIcon
          leftComponent="Product Name"
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
          leftComponent="Quantity"
          rightComponent={
            <SortSwithIcon
              column={`quantity`}
              value={findKeySort(sortFilter, `quantity`)}
            />
          }
        />
      ),
      dataIndex: 'quantity',
      render: (text, data) => (
        <div style={text <= data.inventoryThreshold ? {color: 'red'} : {}}>
          {text}
          {text <= data.inventoryThreshold && (
            <div style={{color: 'red', fontSize: '10px'}}>Out of stock</div>
          )}
        </div>
      ),
      onHeaderCell: () => {
        return {
          onClick: () => onSortChange(getArrSortFilter(sortFilter, 'quantity')),
        };
      },
      className: `sort`,
    },
    {
      title: 'Tax',
      dataIndex: 'taxApply',
      algin: 'center',
      render: (text) => (text == '1' ? <CheckIcon color="green" /> : ''),
    },
    {
      title: 'Status',
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
