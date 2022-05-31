import {Frame, Element} from '@craftjs/core';
import React from 'react';
import {PageContainer} from '../../re-component/PageContainer';

const PageStatic = () => {
  return (
    <div className={`craft_edit_enabled`}>
      <Frame>
        <Element is={PageContainer} canvas />
      </Frame>
    </div>
  );
};

PageStatic.craft = {
  displayName: 'Page Static',
};

export default PageStatic;
