import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {debounce} from '~/helpers/common';
import {getId, handleStyleChange} from './common';
import {useSelector} from 'react-redux';
import {
  getChildrenData,
  getFontStyleMenu,
  getMenuDefault,
  getTextMenu,
} from './menu-data';
import BlockLayoutCollapse from '../editor_layout/layout-menu/BlockLayoutCollapse';

const func = debounce((value) => {
  handleStyleChange(value);
}, 140);

export const Field = ({item, text, children, isNew, style, className}) => {
  const {
    connectors: {connect, drag},
    selected,
    id,
    actions: {setProp},
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

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
      ref={(ref) => connect(drag(ref))}
      className={`${className || ''}`}
      id={getId(id)}>
      <span
        className={`craft-block ${selected ? 'selected' : ''}`}
        data-id={`Text ${id}`}>
        {(item || {})[text] || text}
        {children}
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
        getTextMenu(childrenData),
        ...getMenuDefault(childrenData),
        getFontStyleMenu(childrenData),
      ]}
      handleSubmit={handleSubmit}
    />
  );
};

Field.craft = {
  displayName: 'Field',
  props: {
    text: 'Field',
    fontSize: 14,
    isNew: true,
    style: {},
  },
  related: {
    settings: SettingComponent,
  },
  rules: {
    canDrag: (node) => node.data.props.text != 'Drag',
  },
};
