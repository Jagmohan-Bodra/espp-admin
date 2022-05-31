import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {
  getMenuDefault,
  getPositionStyleMenu,
  getFlexboxStyleMenu,
  getChildrenData,
} from './menu-data';
import {getId, handleStyleChange, setStyleCustomizeBlockStore} from './common';
import BlockLayoutCollapse from '../editor_layout/layout-menu/BlockLayoutCollapse';
import {debounce} from '~/helpers/common';
import {useSelector} from 'react-redux';

const funcSetStyle = debounce((styleCustomize) => {
  styleCustomize && setStyleCustomizeBlockStore(styleCustomize);
}, 500);

export const Block = (props) => {
  const {className, style, isNew, styleCustomize} = props;
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
  }, 170);

  useEffect(() => {
    if (isNew) {
      func({style, id});
      funcSetStyle(styleCustomize);
      setProp((props) => (props.isNew = false));
    }
  }, [isNew]);

  useEffect(() => {
    handleStyleChange({style, id});
  }, [style]);

  return (
    <span
      className={`craft-block ${selected ? 'selected' : ''}`}
      ref={(ref) => connect(drag(ref))}
      data-id={`Block ${id}`}>
      <div className={`${className || ''}`} id={getId(id)}>
        {props.children}
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
        ...getMenuDefault(childrenData),
        getFlexboxStyleMenu(childrenData),
        getPositionStyleMenu(childrenData),
      ]}
      handleSubmit={handleSubmit}
    />
  );
};

export const BlockDefaultProps = {
  className: 'default-craft',
  isNew: true,
  style: {},
};

Block.craft = {
  displayName: 'Block',
  props: BlockDefaultProps,
  related: {
    settings: SettingComponent,
  },
};
