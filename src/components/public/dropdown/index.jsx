import React from 'react';
import {Dropdown as DropdownA, Menu} from 'antd';

const Dropdown = (props) => {
  const {label, data, onChange} = props;

  const handleOnChange = (item) => {
    onChange(item);
  };

  return (
    <DropdownA
      overlay={
        <Menu>
          {(data || []).map((item, index) => (
            <Menu.Item onClick={() => handleOnChange(item)} key={index}>
              {item.text}
            </Menu.Item>
          ))}
        </Menu>
      }
      trigger={['click']}>
      {label}
    </DropdownA>
  );
};

export default Dropdown;
