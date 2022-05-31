import React from 'react';

export const PageContainer = ({style, children}) => {
  return (
    <div style={style} className={`page_container`}>
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
