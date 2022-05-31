import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {Button as MaterialButton} from 'antd';
import {defaultStyleProps, getId, handleStyleChange} from './common';
import {
  getButtonMenu,
  getChildrenData,
  getFontStyleMenu,
  getMenuDefault,
} from './menu-data';
import BlockLayoutCollapse from '../editor_layout/layout-menu/BlockLayoutCollapse';
import {debounce} from '~/helpers/common';
import {useSelector} from 'react-redux';

export const Button = (props) => {
  const {className, style, componentprops, children, isNew} = props;
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

  const handleOnclick = () => {};

  const {size, herf, typeButton, block} = componentprops || {};
  return (
    <div ref={(ref) => connect(drag(ref))}>
      <span
        className={`craft-block ${selected ? 'selected' : ''}`}
        data-id={`Button ${id}`}>
        <MaterialButton
          id={getId(id)}
          className={`${className || ''}`}
          size={size}
          herf={herf}
          type={typeButton}
          block={block}
          onClick={handleOnclick}>
          {children}
        </MaterialButton>
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
        getButtonMenu(childrenData),
        ...getMenuDefault(childrenData),
        getFontStyleMenu(childrenData),
      ]}
      handleSubmit={handleSubmit}
    />
  );
};

Button.craft = {
  displayName: 'Button',
  props: {
    componentprops: {},
    style: defaultStyleProps(),
    className: '',
    isNew: true,
  },
  related: {
    settings: SettingComponent,
  },
  rules: {
    canMoveIn: (incomingNode) => incomingNode.data.type != Button,
  },
};
