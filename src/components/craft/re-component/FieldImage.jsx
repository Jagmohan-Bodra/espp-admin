import React, {useEffect} from 'react';
import {useNode} from '@craftjs/core';
import {getId, handleStyleChange} from './common';
import {
  getChildrenData,
  getClassNameMenu,
  getStyleMenu,
  getTextMenu,
} from './menu-data';
import BlockLayoutCollapse, {
  formType,
} from '../editor_layout/layout-menu/BlockLayoutCollapse';
import {debounce} from '~/helpers/common';
import {useSelector} from 'react-redux';

export const FieldImage = (props) => {
  const {item, text, className, style, componentprops, isNew} = props;
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

  return (
    <div ref={(ref) => connect(drag(ref))} className={`${className || ''}`}>
      <span
        className={`craft-block ${selected ? 'selected' : ''}`}
        data-id={`Image ${id}`}>
        <img
          src={(item || {})[text] || ''}
          alt={componentprops.alt || ''}
          width={50}
          height={50}
          id={getId(id)}
        />
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
        getTextMenu(childrenData),
        {
          key: 'componentprops',
          title: 'Image',
          children: [childrenData.altAvatar],
        },
        {
          key: 'style',
          title: 'Image Style',
          children: [
            {
              formType: formType.SUB_RADIO,
              keyItem: 'object-fit',
              text: 'Object fit',
              value: (propsNode.style || {})[screenMode] || {},
              children: [
                {
                  value: 'contain',
                  text: 'Contain',
                },
                {
                  value: 'cover',
                  text: 'Cover',
                },
                {
                  value: 'fill',
                  text: 'Fill',
                },
                {
                  value: 'none',
                  text: 'None',
                },
                {
                  value: 'scale-down',
                  text: 'Scale Down',
                },
              ],
            },
          ],
        },
        getClassNameMenu(childrenData),
        getStyleMenu(childrenData),
        // getFontStyleMenu(childrenData),
      ]}
      handleSubmit={handleSubmit}
    />
  );
};

FieldImage.craft = {
  displayName: 'FieldImage',
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
