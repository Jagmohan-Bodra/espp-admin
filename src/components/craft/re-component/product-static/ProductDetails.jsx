import {useNode} from '@craftjs/core';
import React from 'react';

const ProductDetails = () => {
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

ProductDetails.craft = {
  displayName: 'Product Details',
};

export default ProductDetails;
