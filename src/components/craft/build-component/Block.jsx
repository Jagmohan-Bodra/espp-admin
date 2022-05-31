import React from 'react';
import {getId} from './common';

export const Block = (props) => {
  const {className, id} = props;

  return (
    <div className={`${className || ''}`} id={getId(id)}>
      {props.children}
    </div>
  );
};

export const BlockDefaultProps = {
  className: 'default-craft',
  isNew: true,
  style: {},
};

Block.craft = {
  displayName: 'Block',
  props: BlockDefaultProps,
};
