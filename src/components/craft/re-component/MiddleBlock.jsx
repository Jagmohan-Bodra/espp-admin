import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {getId, handleStyleChange} from './common';
import {getMenuDefault, getChildrenData} from './menu-data';
import BlockLayoutCollapse from '../editor_layout/layout-menu/BlockLayoutCollapse';
import {debounce} from '~/helpers/common';
import {useSelector} from 'react-redux';

export const MiddleBlock = (props) => {
  const {className, style, isNew} = props;
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
  }, 180);

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
      className={`craft-block ${className} ${selected ? 'selected' : ''}`}
      ref={(ref) => connect(drag(ref))}
      data-id={`Middle Block ${id}`}>
      <div className={`flex-div`}>
        <div className={`middle-flex-div`}>
          <div id={getId(id)}>{props.children}</div>
        </div>
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
      menu={[...getMenuDefault(childrenData)]}
      handleSubmit={handleSubmit}
    />
  );
};

export const MiddleBlockDefaultProps = {
  className: 'default-craft',
  isNew: true,
  style: {},
};

MiddleBlock.craft = {
  displayName: 'Middle Block',
  props: MiddleBlockDefaultProps,
  related: {
    settings: SettingComponent,
  },
};
