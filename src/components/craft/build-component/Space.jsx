import React from 'react';
import {Space as AntdSpace} from 'antd';
import {getId} from './common';

export const Space = (props) => {
  const {className, componentprops, id} = props;
  const {direction, size, align} = componentprops;

  return (
    <div className={`${className}`} id={getId(id)}>
      <AntdSpace
        direction={direction}
        size={!isNaN(size) ? parseInt(size) : size}
        align={align}>
        {props.children}
      </AntdSpace>
    </div>
  );
};

export const SpaceDefaultProps = {
  className: 'default-craft',
  componentprops: {},
  isNew: true,
  style: {},
};

Space.craft = {
  displayName: 'Space',
  props: SpaceDefaultProps,
};
