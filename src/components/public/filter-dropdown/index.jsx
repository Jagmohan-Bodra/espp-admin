import React from 'react';
import {Button, Dropdown} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import './style.scss';
const cssClass = 'p_filter_dropdown_button_component';

const FilterDropdown = (props) => {
  return (
    <Dropdown
      {...props}
      className={`${cssClass} ${props.className}`}
      trigger={['click']}>
      <Button type="text" onClick={(e) => e.preventDefault()}>
        Quick Filters <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default FilterDropdown;
