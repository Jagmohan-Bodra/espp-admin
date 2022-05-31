import React from 'react';
import styleGlobal from '~/public/assets/styleGlobal';
import {Checkbox, Space, Tooltip} from 'antd';

const cssClass = styleGlobal.P_TABLE_FILTER_DROPDOWN_COMPONENT;

const CheckboxFilter = (props) => {
  const {data, nameOption, onChangeData, value} = props;

  const onChange = (optionValue) => {
    const newData = [...value];
    const index = (newData || []).indexOf(optionValue);
    if (index !== -1) {
      newData.splice(index, 1);
    } else {
      newData.push(optionValue);
    }
    onChangeData && onChangeData(newData);
  };
  return (
    <div className={`${cssClass}__checkbox_layout`}>
      <Space direction="vertical">
        {(data || []).map((item, index) => (
          <Tooltip
            key={index}
            placement="right"
            title={nameOption ? nameOption(item) : item.name}>
            <Checkbox
              value={`${item.id}`}
              onChange={(value) => onChange(value.target.value)}
              checked={value.includes(`${item.id}`)}>
              {nameOption ? nameOption(item) : item.name}{' '}
              {value.includes(`${item.id}`)}
            </Checkbox>
          </Tooltip>
        ))}
      </Space>
    </div>
  );
};

export default CheckboxFilter;
