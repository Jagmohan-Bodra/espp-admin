import React from 'react';
import {Space} from 'antd';
import countryJson from '~/resource/country-region-data.json';
import {EditCraftIcon, TrashIcon} from '~/public/assets/icon';

export const ACTIONS_KEY = {
  EDIT: 'EDIT',
  DELETE: 'DELETE',
};

const columns = (props) => {
  const {isEdit, isDelete} = props;
  return [
    {
      title: 'Name',
      width: 200,
      ellipsis: true,
      render: (item) => item && `${item.firstName} ${item.lastName}`,
    },
    {
      title: 'Address',
      ellipsis: true,
      render: (item) => item && getFullAddress(item),
    },
    (isEdit || isDelete) && {
      title: 'Actions',
      align: 'center',
      width: 80,
      render: (item) => handleAction(item, props),
    },
  ].filter((item) => item);
};

const handleAction = (item, {onActionItem, edit}) => {
  return (
    <Space>
      <EditCraftIcon onClick={() => edit(item)} style={{color: 'green'}} />
      <TrashIcon
        color={`red`}
        style={{fontSize: '18px', cursor: 'pointer'}}
        onClick={() => onActionItem(item)}
      />
    </Space>
  );
};

export default columns;

const getFullAddress = (item) => {
  const country = countryJson.find((coun) => coun.value == item.country) || {};
  const countryText = country.text || '';
  const cityText =
    ((country.regions || []).find((reg) => reg.value == item.city) || {})
      .text || '';
  const fullAddress = `${item.unitNo || ''} ${item.stresstName || ''} ${
    item.floor || ''
  } ${item.buildingName || ''} ${item.state || ''} ${cityText} ${countryText} ${
    item.postCode || ''
  }`
    .replace(/\s+/g, ' ')
    .trim();
  return fullAddress;
};
