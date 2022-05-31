import React from 'react';
import {Divider as AntdDivider} from 'antd';
import {getId} from './common';

export const Divider = (props) => {
  const {className, componentprops, id} = props;

  return (
    <div style={{minHeight: '5px'}}>
      <AntdDivider
        {...componentprops}
        className={`padding-default ${className}`}
        id={getId(id)}
      />
    </div>
  );
};

export const DividerDefaultProps = {
  style: {},
};

Divider.craft = {
  displayName: 'Divider',
  props: DividerDefaultProps,
};
