import React from 'react';
import {Collapse as AntdCollapse} from 'antd';
import {getId} from './common';

export const Collapse = (props) => {
  const {className, componentprops, children, header, id} = props;
  const {expand} = componentprops;
  const defaultActiveKey = expand ? ['collapse/.0'] : [];

  return (
    <div className={`${className || ''}`} id={getId(id)}>
      <AntdCollapse {...componentprops} defaultActiveKey={defaultActiveKey}>
        {React.Children.map(children, (content) => (
          <AntdCollapse.Panel header={header} key={'collapse'}>
            {content}
          </AntdCollapse.Panel>
        ))}
      </AntdCollapse>
    </div>
  );
};

Collapse.craft = {
  displayName: 'Collapse',
  props: {
    componentprops: {},
    className: '',
    isNew: true,
    header: `Header`,
  },
};
