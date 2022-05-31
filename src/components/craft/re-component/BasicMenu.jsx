import React, {useEffect, useState} from 'react';
import {useNode} from '@craftjs/core';
import {defaultStyleProps, getId, handleStyleChange} from './common';
import {getChildrenData, getMenuDefault} from './menu-data';
import BlockLayoutCollapse from '../editor_layout/layout-menu/BlockLayoutCollapse';
import {debounce} from '~/helpers/common';
import {useSelector} from 'react-redux';

export const BasicMenu = (props) => {
  const {className, style, data, isNew} = props;

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

  const LiComponent = (props) => {
    const {item, index, className, isActive} = props;
    const {title, iconData, path, children} = item;
    const [show, setShow] = useState(false);
    const isDropdown = (children || []).length != 0;

    const handleShow = () => {
      if (isDropdown) {
        setShow(!show);
      }
    };
    return (
      <li
        key={index}
        className={`${className} ${isDropdown ? 'dropdown' : ''} ${
          isActive ? 'active' : ''
        }`}>
        <a
          href={`${path || '#'}`}
          className={`${className}_link ${
            isDropdown ? 'dropdown-toggle' : ''
          } ${show ? 'show' : ''}`}
          onClick={handleShow}>
          {iconData} {title}
        </a>
        {isDropdown && (
          <ul className={`${className}_dropdown ${show ? 'show' : ''}`}>
            {children.map((item, index) => (
              <LiComponent
                key={index}
                item={item}
                index={index}
                className={`${className}_sub`}
              />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`${className || ''}`}
      id={getId(id)}
      key={isNew}>
      <div
        className={`craft-block ${selected ? 'selected' : ''}`}
        data-id={`Collapse ${id}`}>
        <ul className={`basic-menu`}>
          {(data || []).map((item, index) => (
            <LiComponent
              key={index}
              item={item}
              index={index}
              className={`menu_item`}
              isActive={index == 0}
            />
          ))}
        </ul>
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
      menu={[...getMenuDefault(childrenData)]}
      handleSubmit={handleSubmit}
    />
  );
};

BasicMenu.craft = {
  displayName: 'BasicMenu',
  props: {
    style: defaultStyleProps(),
    className: '',
    isNew: true,
    data: [
      {
        key: 'home',
        title: 'Home title',
        iconData: '',
        path: '#',
        shortCode: '',
      },
      {
        key: 'home1',
        title: 'Home title 1',
        iconData: '',
        path: '#',
        shortCode: '',
      },
    ],
  },
  related: {
    settings: SettingComponent,
  },
};
