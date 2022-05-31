import {useNode} from '@craftjs/core';
import React from 'react';

const PaymentMethod = () => {
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

PaymentMethod.craft = {
  displayName: 'Payment Method',
};

export default PaymentMethod;
