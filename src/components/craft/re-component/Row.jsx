import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {Row as AntdRow} from 'antd';
import {getId, handleStyleChange} from './common';
import {
  getMenuDefault,
  getChildrenData,
  getRowMenu,
  getFontStyleMenu,
} from './menu-data';
import BlockLayoutCollapse from '../editor_layout/layout-menu/BlockLayoutCollapse';
import {debounce} from '~/helpers/common';
import {useSelector} from 'react-redux';

export const Row = (props) => {
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

  const {gutterHorizontal, gutterVertical, align, justify} = componentprops;

  return (
    <span
      className={`craft-block ${selected ? 'selected' : ''}`}
      ref={(ref) => connect(drag(ref))}
      data-id={`Row ${id}`}>
      <AntdRow
        className={`${className}`}
        id={getId(id)}
        gutter={[
          parseInt(gutterHorizontal) || 0,
          parseInt(gutterVertical) || 0,
        ]}
        align={align}
        justify={justify}>
        {props.children}
      </AntdRow>
    </span>
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
        getRowMenu(childrenData),
        ...getMenuDefault(childrenData),
        getFontStyleMenu(childrenData),
      ]}
      handleSubmit={handleSubmit}
    />
  );
};

export const RowDefaultProps = {
  className: 'default-craft',
  componentprops: {},
  isNew: true,
  style: {},
};

Row.craft = {
  displayName: 'Row',
  props: RowDefaultProps,
  related: {
    settings: SettingComponent,
  },
};
