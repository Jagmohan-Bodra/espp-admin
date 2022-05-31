import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {debounce} from '~/helpers/common';
import {getId, handleStyleChange} from './common';
import {useSelector} from 'react-redux';
import {getChildrenData, getFontStyleMenu, getMenuDefault} from './menu-data';
import BlockLayoutCollapse from '../editor_layout/layout-menu/BlockLayoutCollapse';
import RichTextExample from '~/components/public/slate/Richtext';
import ReadOnlyExample from '~/components/public/slate/ReadOnlyExample';

export const Text = ({className, textValue, children, isNew, style}) => {
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
  }, 140);

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
        <ReadOnlyExample value={textValue} />
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
        // getTextMenu(childrenData),
        ...getMenuDefault(childrenData),
        getFontStyleMenu(childrenData),
      ]}
      handleSubmit={handleSubmit}
    />
  );
};

const TextSettings = () => {
  const {
    actions: {setProp},
    textValue,
  } = useNode((node) => ({
    textValue: node.data.props.textValue,
  }));

  const func = (value) => {
    setProp((props) => (props.textValue = value));
  };

  return <RichTextExample value={textValue} setValue={func} />;
};

Text.craft = {
  displayName: 'Text',
  props: {
    text: 'Hi',
    fontSize: 14,
    isNew: true,
    style: {},
    textValue: [
      {
        type: 'paragraph',
        children: [{text: 'Hello word'}],
      },
    ],
  },
  related: {
    settings: SettingComponent,
    textSetting: TextSettings,
  },
  rules: {
    canDrag: (node) => node.data.props.text != 'Drag',
  },
};
