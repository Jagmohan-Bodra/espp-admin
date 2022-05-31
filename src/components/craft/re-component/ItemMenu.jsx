import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {Menu as AntdMenu} from 'antd';
import {defaultStyleProps, getId, handleStyleChange} from './common';
import {getChildrenData, getMenuDefault, getPropsMenuMenu} from './menu-data';
import BlockLayoutCollapse from '../editor_layout/layout-menu/BlockLayoutCollapse';
import {debounce} from '~/helpers/common';
import {useSelector} from 'react-redux';
import {Link} from './Link';

export const ItemMenu = (props) => {
  const {className, style, componentprops, data, isNew} = props;
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

  const itemMenuRender = (item, index) => {
    return (
      <AntdMenu.Item
        key={`${item.key}_${index}`}
        icon={
          <span
            className={`icon`}
            dangerouslySetInnerHTML={{__html: item.iconData}}></span>
        }>
        <Link path={item.path}>{item.title}</Link>
      </AntdMenu.Item>
    );
  };

  const {
    mode,
    theme,
    expandIcon,
    triggerSubMenuAction,
    unExpandIcon,
  } = componentprops;

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`${className || ''}`}
      id={getId(id)}
      key={isNew}>
      <div
        className={`craft-block ${selected ? 'selected' : ''}`}
        data-id={`Collapse ${id}`}>
        <AntdMenu
          mode={mode}
          theme={theme}
          triggerSubMenuAction={triggerSubMenuAction}
          expandIcon={(isExpand) => {
            return isExpand.isOpen ? (
              <span
                className={`expand-icon open`}
                dangerouslySetInnerHTML={{
                  __html: `${expandIcon || ''}`,
                }}></span>
            ) : (
              <span
                className={`expand-icon`}
                dangerouslySetInnerHTML={{
                  __html: `${unExpandIcon || ''}`,
                }}></span>
            );
          }}>
          {data.map((item, index) => {
            if ((item.children || []).length > 0) {
              return (
                <AntdMenu.SubMenu
                  key={`${item.key}_${index}`}
                  title={item.title}
                  icon={
                    <span
                      className={`icon`}
                      dangerouslySetInnerHTML={{__html: item.iconData}}></span>
                  }
                  popupClassName={`sub_menu_popup ${className}_sub`}>
                  {item.children.map(itemMenuRender)}
                </AntdMenu.SubMenu>
              );
            }
            return itemMenuRender(item, index);
          })}
        </AntdMenu>
      </div>
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
      menu={[getPropsMenuMenu(propsNode), ...getMenuDefault(childrenData)]}
      handleSubmit={handleSubmit}
    />
  );
};

ItemMenu.craft = {
  displayName: 'ItemMenu',
  props: {
    componentprops: {
      mode: 'horizontal',
      theme: 'light',
      triggerSubMenuAction: 'hover',
      expandIcon: '',
    },
    style: defaultStyleProps(),
    className: '',
    isNew: true,
    data: [
      {
        key: 'home',
        title: 'Home title',
        iconData: '',
        path: '#',
      },
    ],
  },
  related: {
    settings: SettingComponent,
  },
};
