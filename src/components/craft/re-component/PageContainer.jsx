import React from 'react';
import {useNode} from '@craftjs/core';

export const PageContainer = ({style, children}) => {
  const {
    connectors: {connect, drag},
  } = useNode();
  return (
    <div
      ref={(ref) => connect(drag(ref))}
      style={style}
      className={`page_container`}>
      {children}
    </div>
  );
};

export const PageContainerDefaultProps = {
  style: {
    background: '#fff',
    minHeight: '100vh',
    minWidth: '100%',
  },
};

PageContainer.craft = {
  displayName: 'Page',
  props: PageContainerDefaultProps,
};
