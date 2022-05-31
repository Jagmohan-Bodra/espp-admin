import {useNode} from '@craftjs/core';
import React from 'react';

const MenuStatic = () => {
  const {
    connectors: {connect, drag},
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));
  return (
    <div
      className={`craft-block ${selected ? 'selected' : ''}`}
      style={{width: '50px', height: '50px', background: '#4b4b4b70'}}
      ref={(ref) => connect(drag(ref))}></div>
  );
};

MenuStatic.craft = {
  displayName: 'MenuStatic',
};

export default MenuStatic;
