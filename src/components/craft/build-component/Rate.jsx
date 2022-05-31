import React from 'react';
import {Rate as AntdRate} from 'antd';

export const Rate = (props) => {
  return (
    <span>
      <AntdRate {...props}>{props.children}</AntdRate>
    </span>
  );
};

export const RateDefaultProps = {};

Rate.craft = {
  props: RateDefaultProps,
};
