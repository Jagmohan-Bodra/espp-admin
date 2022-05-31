import {useNode} from '@craftjs/core';
import React from 'react';

const ProductList = () => {
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

ProductList.craft = {
  displayName: 'Produc tList',
};

export default ProductList;
