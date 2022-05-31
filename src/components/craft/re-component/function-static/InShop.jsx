import {useNode} from '@craftjs/core';
import React from 'react';

const InShop = () => {
  const {
    connectors: {connect, drag},
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));
  return (
    <div
      className={`empty-component craft-block ${selected ? 'selected' : ''}`}
      ref={(ref) => connect(drag(ref))}></div>
  );
};

InShop.craft = {
  displayName: 'Order In Shop',
};

export default InShop;
