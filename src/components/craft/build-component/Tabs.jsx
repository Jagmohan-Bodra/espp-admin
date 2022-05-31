import React from 'react';
import {Tabs as AntdTabs} from 'antd';
import ContentEditable from 'react-contenteditable';
import {getId} from './common';

export const Tabs = (props) => {
  const {className, componentprops, children, data, id} = props;
  const {tabPosition, size, typeprops} = componentprops;

  return (
    <div className={`${className || ''}`} id={getId(id)}>
      <AntdTabs
        {...componentprops}
        type={
          typeprops === 'editable-card' ? 'line' : typeprops || 'editable-card'
        }
        tabPosition={tabPosition}
        size={size}>
        {(((children || {}).props || {}).children || []).map(
          (content, index) => (
            <AntdTabs.TabPane
              tab={
                <ContentEditable
                  html={(data[index] || {}).title}
                  tagName="span"
                />
              }
              key={index}
              closable={true}>
              {content}
            </AntdTabs.TabPane>
          ),
        )}
      </AntdTabs>
    </div>
  );
};

Tabs.craft = {
  displayName: 'Tabs',
  props: {
    componentprops: {},
    style: {},
    className: '',
    isNew: true,
  },
};
