import React, {useEffect} from 'react';
import {Element, useEditor, useNode} from '@craftjs/core';
import {Tabs as AntdTabs} from 'antd';
import {getId, handleStyleChange} from './common';
import {getChildrenData, getMenuDefault, getPropsTabsMenu} from './menu-data';
import BlockLayoutCollapse from '../editor_layout/layout-menu/BlockLayoutCollapse';
import {debounce} from '~/helpers/common';
import {useSelector} from 'react-redux';
import {Block} from './Block';
import ContentEditable from 'react-contenteditable';

export const Tabs = (props) => {
  const {className, style, componentprops, children, data, isNew} = props;
  const {
    connectors: {connect, drag},
    selected,
    id,
    actions: {setProp},
  } = useNode((state) => ({
    selected: state.events.selected,
  }));
  const {actions, query} = useEditor();

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

  const onEdit = (targetKey, action) => {
    if (action == 'add') {
      return add(targetKey);
    }
    if (action == 'remove') {
      return remove(targetKey);
    }
  };

  const add = () => {
    //add title
    const newData = [...data];
    newData.push({title: 'New Tab'});

    //add Block
    const nodeData = query.createNode(
      <Element is={Block} canvas style={{PC: {width: '100%'}}} />,
    );

    actions.add(nodeData, id);
    setProp((props) => (props.data = newData));
  };

  const remove = (targetKey) => {
    const newData = [...data];
    if (targetKey > -1) {
      newData.splice(targetKey, 1);
      actions.delete(
        ((((children || {}).props || {}).children || {})[targetKey] || {}).key,
      );
    }
  };

  const {tabPosition, size, typeprops} = componentprops;

  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`${className || ''}`}
      id={getId(id)}
      key={isNew}>
      <div
        className={`craft-block ${selected ? 'selected' : ''}`}
        data-id={`Collapse ${id}`}>
        <AntdTabs
          {...componentprops}
          type={
            !selected && typeprops === 'editable-card'
              ? 'line'
              : typeprops || 'editable-card'
          }
          onEdit={onEdit}
          tabPosition={tabPosition}
          size={size}>
          {(((children || {}).props || {}).children || []).map(
            (content, index) => (
              <AntdTabs.TabPane
                tab={
                  <ContentEditable
                    disabled={!selected}
                    html={(data[index] || {}).title}
                    onChange={(e) =>
                      setProp(
                        (props) =>
                          (props.data[index].title = e.target.value.replace(
                            /<\/?[^>]+(>|$)/g,
                            '',
                          )),
                      )
                    }
                    tagName="span"
                  />
                }
                key={index}
                closable={true}>
                {content}
              </AntdTabs.TabPane>
            ),
          )}
        </AntdTabs>
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
      menu={[getPropsTabsMenu(propsNode), ...getMenuDefault(childrenData)]}
      handleSubmit={handleSubmit}
    />
  );
};

Tabs.craft = {
  displayName: 'Tabs',
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
