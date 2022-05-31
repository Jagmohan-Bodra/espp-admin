import React from 'react';
import {useNode} from '@craftjs/core';
import {Rate as AntdRate} from 'antd';

export const Rate = (props) => {
  const {
    connectors: {connect, drag},
  } = useNode();
  return (
    <span ref={(ref) => connect(drag(ref))}>
      <AntdRate {...props}>{props.children}</AntdRate>
    </span>
  );
};

export const RateDefaultProps = {};

Rate.craft = {
  props: RateDefaultProps,
};
