import React from 'react';
import {Col as AntdCol} from 'antd';
import {getId} from './common';

const getColumnSpan = {
  1: [2, 2, 4],
  2: [4, 8, 12],
  3: [6, 12, 24],
  4: [8, 12, 24],
  5: [10, 12, 24],
  6: [12, 12, 24],
  7: [14, 14, 24],
  8: [16, 16, 24],
  9: [18, 18, 24],
  10: [20, 20, 24],
  11: [22, 22, 24],
  12: [24, 24, 24],
};

export const Col = (props) => {
  const {className, span, id} = props;
  const column = getColumnSpan[span] || getColumnSpan[2];

  return (
    <AntdCol
      className={`${className}`}
      id={getId(id)}
      xl={column[0]}
      lg={column[1]}
      md={column[1]}
      sm={column[2]}
      xs={column[2]}>
      {props.children}
    </AntdCol>
  );
};

export const ColDefaultProps = {
  className: 'default-craft',
  span: 4,
  isNew: true,
  style: {},
};

Col.craft = {
  displayName: 'Column',
  props: ColDefaultProps,
};
