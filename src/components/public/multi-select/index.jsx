import React from 'react';
import {Select, Tag} from 'antd';
import styleGlobal from '~/public/assets/styleGlobal';

const cssClass = styleGlobal.P_SELECT_DROPDOWN;

const tagRender = (props) => {
  const {label, closable, onClose} = props;
  return (
    <Tag closable={closable} onClose={onClose} style={{marginRight: 3}}>
      {label}
    </Tag>
  );
};

const SelectDropdown = (props) => {
  return (
    <div className={`${cssClass}`}>
      <Select
        {...props}
        mode="multiple"
        showArrow
        tagRender={tagRender}
        style={{width: '100%'}}
        size={'middle'}
        filterOption={(input, option) =>
          option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      />
    </div>
  );
};

export default SelectDropdown;
