import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {Avatar as AntdAvatar} from 'antd';
import {getId, handleStyleChange} from './common';
import {
  getAvatarUrlMenu,
  getChildrenData,
  getClassNameMenu,
  getFontStyleMenu,
  getStyleMenu,
} from './menu-data';
import BlockLayoutCollapse from '../editor_layout/layout-menu/BlockLayoutCollapse';
import {debounce} from '~/helpers/common';
import {useSelector} from 'react-redux';

export const Avatar = (props) => {
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

  const backgroundImage = componentprops['background-image'];
  const backgroundSize = componentprops['background-size'];

  return (
    <div ref={(ref) => connect(drag(ref))} className={`${className || ''}`}>
      <span
        className={`craft-block ${selected ? 'selected' : ''}`}
        data-id={`Avatar ${id}`}>
        <AntdAvatar
          id={getId(id)}
          size={backgroundSize}
          src={backgroundImage}
          shape={componentprops.shape || 'square'}>
          {children} {componentprops.alt || ''}
        </AntdAvatar>
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
        getAvatarUrlMenu(childrenData),
        getClassNameMenu(childrenData),
        getStyleMenu(childrenData),
        getFontStyleMenu(childrenData),
      ]}
      handleSubmit={handleSubmit}
    />
  );
};

Avatar.craft = {
  displayName: 'Avatar',
  props: {
    componentprops: {},
    style: {},
    className: '',
    isNew: true,
  },
  related: {
    settings: SettingComponent,
  },
};
