import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {Collapse as AntdCollapse} from 'antd';
import {defaultStyleProps, getId, handleStyleChange} from './common';
import {
  getChildrenData,
  getCollapseMenu,
  getHeaderCollapseMenu,
  getMenuDefault,
} from './menu-data';
import BlockLayoutCollapse from '../editor_layout/layout-menu/BlockLayoutCollapse';
import {debounce} from '~/helpers/common';
import {useSelector} from 'react-redux';

export const Collapse = (props) => {
  const {className, style, componentprops, children, isNew, header} = props;
  const {
    connectors: {connect, drag},
    selected,
    id,
    actions: {setProp},
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const func = debounce((value) => {
    handleStyleChange(value);
  }, 100);

  useEffect(() => {
    if (isNew) {
      func({style, id});
      setProp((props) => (props.isNew = false));
    }
  }, [isNew]);

  useEffect(() => {
    handleStyleChange({style, id});
  }, [style]);

  const {expand} = componentprops;
  const defaultActiveKey = expand ? ['collapse/.0'] : [];

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`${className || ''}`}
      id={getId(id)}
      key={isNew}>
      <span
        className={`craft-block ${selected ? 'selected' : ''}`}
        data-id={`Collapse ${id}`}>
        <AntdCollapse {...componentprops} defaultActiveKey={defaultActiveKey}>
          {React.Children.map(children, (content) => (
            <AntdCollapse.Panel header={header} key={'collapse'}>
              {content}
            </AntdCollapse.Panel>
          ))}
        </AntdCollapse>
      </span>
    </div>
  );
};

const SettingComponent = () => {
  const {
    actions: {setProp},
    propsNode,
  } = useNode((node) => ({
    propsNode: node.data.props,
  }));
  const screenMode = useSelector((state) => state.craft.mode);

  const handleSubmit = (key, value) => {
    if ('style' == key) {
      return setProp((props) => (props.style[screenMode] = value || ''));
    }
    return setProp((props) => (props[key] = value || ''));
  };

  const childrenData = getChildrenData({
    ...propsNode,
    style: (propsNode.style || {})[screenMode] || {},
  });
  return (
    <BlockLayoutCollapse
      menu={[
        getHeaderCollapseMenu(propsNode),
        getCollapseMenu(propsNode),
        ...getMenuDefault(childrenData),
      ]}
      handleSubmit={handleSubmit}
    />
  );
};

Collapse.craft = {
  displayName: 'Collapse',
  props: {
    componentprops: {},
    style: defaultStyleProps(),
    className: '',
    isNew: true,
    header: `Header`,
  },
  related: {
    settings: SettingComponent,
  },
};
