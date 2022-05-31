import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {Col as AntdCol} from 'antd';
import {getId, handleStyleChange} from './common';
import {
  getChildrenData,
  getColumnMenu,
  getFontStyleMenu,
  getMenuDefault,
} from './menu-data';
import BlockLayoutCollapse from '../editor_layout/layout-menu/BlockLayoutCollapse';
import {debounce} from '~/helpers/common';
import {useSelector} from 'react-redux';

const getColumnSpan = {
  1: [2, 2, 4],
  2: [4, 8, 12],
  3: [6, 12, 24],
  4: [8, 12, 24],
  5: [10, 12, 24],
  6: [12, 12, 24],
  7: [14, 14, 24],
  8: [16, 16, 24],
  9: [18, 18, 24],
  10: [20, 20, 24],
  11: [22, 22, 24],
  12: [24, 24, 24],
};

export const Col = (props) => {
  const {className, style, span, isNew} = props;
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
  }, 110);

  useEffect(() => {
    if (isNew) {
      func({style, id});
      setProp((props) => (props.isNew = false));
    }
  }, [isNew]);

  useEffect(() => {
    handleStyleChange({style, id});
  }, [style]);

  const column = getColumnSpan[span] || getColumnSpan[2];
  return (
    <AntdCol
      className={`${className}`}
      id={getId(id)}
      xl={column[0]}
      lg={column[1]}
      md={column[1]}
      sm={column[2]}
      xs={column[2]}
      ref={(ref) => connect(drag(ref))}>
      <span
        className={`craft-block ${selected ? 'selected h-10p' : 'h-10p'}`}
        data-id={`Col ${id}`}>
        {props.children}
      </span>
    </AntdCol>
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
        getColumnMenu(childrenData),
        ...getMenuDefault(childrenData),
        getFontStyleMenu(childrenData),
      ]}
      handleSubmit={handleSubmit}
    />
  );
};

export const ColDefaultProps = {
  className: 'default-craft',
  span: 4,
  isNew: true,
  style: {},
};

Col.craft = {
  displayName: 'Column',
  props: ColDefaultProps,
  related: {
    settings: SettingComponent,
  },
};
