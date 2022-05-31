import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {Divider as AntdDivider} from 'antd';
import {debounce} from '~/helpers/common';
import {getId, handleStyleChange} from './common';
import {useSelector} from 'react-redux';
import BlockLayoutCollapse from '../editor_layout/layout-menu/BlockLayoutCollapse';
import {getChildrenData, getMenuDefault} from './menu-data';

export const Divider = (props) => {
  const {className, style, componentprops, isNew} = props;
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
  }, 130);

  useEffect(() => {
    if (isNew) {
      func({style, id});
      setProp((props) => (props.isNew = false));
    }
  }, [isNew]);

  useEffect(() => {
    handleStyleChange({style, id});
  }, [style]);

  return (
    <div
      style={{minHeight: '5px'}}
      className={`craft-block ${selected ? 'selected' : ''}`}
      ref={(ref) => connect(drag(ref))}
      data-id={`Divider ${id}`}>
      <AntdDivider
        {...componentprops}
        className={`padding-default ${className}`}
        id={getId(id)}
      />
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
      menu={[...getMenuDefault(childrenData)]}
      handleSubmit={handleSubmit}
    />
  );
};

export const DividerDefaultProps = {
  style: {},
};

Divider.craft = {
  displayName: 'Divider',
  props: DividerDefaultProps,
  related: {
    settings: SettingComponent,
  },
};
