import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {getId, handleStyleChange} from './common';
import {getMenuDefault, getIsContainerMenu, getChildrenData} from './menu-data';
import BlockLayoutCollapse from '../editor_layout/layout-menu/BlockLayoutCollapse';
import {debounce} from '~/helpers/common';
import {useSelector} from 'react-redux';

export const Container = (props) => {
  const {className, style, isContainer, isNew} = props;
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
  }, 120);

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
    <span
      className={`craft-block ${selected ? 'selected' : ''}`}
      ref={(ref) => connect(drag(ref))}
      data-id={`Container ${id}`}>
      <div
        className={`${isContainer ? 'container' : 'container-fluid'} ${
          className || ''
        }`}
        id={getId(id)}>
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
      menu={[getIsContainerMenu(childrenData), ...getMenuDefault(childrenData)]}
      handleSubmit={handleSubmit}
    />
  );
};

export const ContainerDefaultProps = {
  className: 'default-craft',
  isContainer: true,
  isNew: true,
  style: {},
};

Container.craft = {
  displayName: 'Container',
  props: ContainerDefaultProps,
  related: {
    settings: SettingComponent,
  },
};
