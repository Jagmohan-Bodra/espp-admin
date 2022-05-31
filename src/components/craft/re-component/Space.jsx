import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {Space as AntdSpace} from 'antd';
import {getId, handleStyleChange} from './common';
import {
  getChildrenData,
  getFontStyleMenu,
  getMenuDefault,
  getSpaceMenu,
} from './menu-data';
import BlockLayoutCollapse from '../editor_layout/layout-menu/BlockLayoutCollapse';
import {debounce} from '~/helpers/common';
import {useSelector} from 'react-redux';

export const Space = (props) => {
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
  }, 140);

  useEffect(() => {
    if (isNew) {
      func({style, id});
      setProp((props) => (props.isNew = false));
    }
  }, [isNew]);

  useEffect(() => {
    handleStyleChange({style, id});
  }, [style]);

  const {direction, size, align} = componentprops;

  return (
    <span
      className={`craft-block ${selected ? 'selected' : ''}`}
      data-id={`Space ${id}`}
      ref={(ref) => connect(drag(ref))}>
      <div className={`${className}`} id={getId(id)}>
        <AntdSpace
          direction={direction}
          size={!isNaN(size) ? parseInt(size) : size}
          align={align}>
          {props.children}
        </AntdSpace>
      </div>
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
        getSpaceMenu(childrenData),
        ...getMenuDefault(childrenData),
        getFontStyleMenu(childrenData),
      ]}
      handleSubmit={handleSubmit}
    />
  );
};

export const SpaceDefaultProps = {
  className: 'default-craft',
  componentprops: {},
  isNew: true,
  style: {},
};

Space.craft = {
  displayName: 'Space',
  props: SpaceDefaultProps,
  related: {
    settings: SettingComponent,
  },
};
