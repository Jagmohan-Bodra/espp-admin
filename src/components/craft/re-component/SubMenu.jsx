import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {Menu as AntdMenu} from 'antd';
import {defaultStyleProps, getId, handleStyleChange} from './common';
import {
  getChildrenData,
  getMenuDefault,
  getTitleSubMenuMenu,
} from './menu-data';
import BlockLayoutCollapse from '../editor_layout/layout-menu/BlockLayoutCollapse';
import {debounce} from '~/helpers/common';
import {useSelector} from 'react-redux';

export const SubMenu = (props) => {
  const {className, style, componentprops, children, isNew, title} = props;
  const {
    connectors: {connect, drag},
    selected,
    id,
    actions: {setProp},
  } = useNode((state) => ({
    selected: state.events.selected,
  }));
  const screenMode = useSelector((state) => state.craft.mode);
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

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`${className || ''}`}
      id={getId(id)}
      key={isNew}>
      <span
        className={`craft-block ${selected ? 'selected' : ''}`}
        data-id={`Collapse ${id}`}>
        <AntdMenu
          {...componentprops}
          mode="horizontal"
          triggerSubMenuAction={'click'}>
          <AntdMenu.SubMenu
            key="SubMenu"
            title={title}
            popupClassName={`sub_menu_popup ${screenMode} ${className}_sub`}>
            {(((children || {}).props || {}).children || []).map(
              (content, index) => (
                <AntdMenu.Item key={index}>{content}</AntdMenu.Item>
              ),
            )}
          </AntdMenu.SubMenu>
        </AntdMenu>
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
      menu={[getTitleSubMenuMenu(propsNode), ...getMenuDefault(childrenData)]}
      handleSubmit={handleSubmit}
    />
  );
};

SubMenu.craft = {
  displayName: 'SubMenu',
  props: {
    componentprops: {},
    style: defaultStyleProps(),
    className: '',
    isNew: true,
    title: 'title',
  },
  related: {
    settings: SettingComponent,
  },
};
