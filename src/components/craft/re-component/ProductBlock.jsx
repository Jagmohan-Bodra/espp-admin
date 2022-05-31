import React, {useEffect, useState} from 'react';
import {Row, Col} from 'antd';
import {useNode} from '@craftjs/core';
import {debounce, flatten} from '~/helpers/common';
import {getId, handleStyleChange} from './common';
import {useSelector} from 'react-redux';
import {getBlockSelectMenu, getChildrenData, getMenuDefault} from './menu-data';
import BlockLayoutCollapse, {
  formType,
} from '../editor_layout/layout-menu/BlockLayoutCollapse';
import blockApi from '~/apis/api/block';
import productApi from '~/apis/api/product';
import categoryApi from '~/apis/api/category';
import {componentsBuild} from '../build-component/common';
import {decode} from '../common/util';

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

const func = debounce((value) => {
  handleStyleChange(value);
}, 140);

export const genderComponentById = (
  item,
  index,
  jsonData,
  styleCustomize = '',
  id = 'ROOT',
) => {
  const {type, props, hidden, nodes} = jsonData[id];
  const Component = componentsBuild()[type.resolvedName];
  return (
    <Component
      obj={item}
      {...props}
      hidden={hidden}
      key={`${id}${index}`}
      isNew={true}
      styleCustomize={styleCustomize}
      id={id == 'ROOT' ? '' : id}>
      {(nodes || []).map((nodeItem) =>
        genderComponentById(item, index, jsonData, '', nodeItem),
      )}
    </Component>
  );
};

export const ProductBlock = ({className, blockId, isNew, style, filter}) => {
  const [blockContent, setBlockContent] = useState({});
  const [data, setData] = useState([]);
  const {space, cols, itemLength, sortBy, type} = filter || {};
  const {
    connectors: {connect, drag},
    selected,
    id,
    actions: {setProp},
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  useEffect(() => {
    if (!type || type == 'product') {
      productApi
        .getProductList({
          meta: {
            page: 1,
            pageSize:
              !parseInt(itemLength) ||
              parseInt(itemLength) > 20 ||
              parseInt(itemLength) < 1
                ? 3
                : parseInt(itemLength),
            sort: (sortBy || '').split(' '),
          },
        })
        .then((results) => setData(results.data));
    }
    if (type == 'product_category') {
      categoryApi
        .getCategoryList({
          meta: {
            page: 1,
            pageSize:
              !parseInt(itemLength) ||
              parseInt(itemLength) > 20 ||
              parseInt(itemLength) < 1
                ? 3
                : parseInt(itemLength),
            sort: (sortBy || '').split(' '),
          },
        })
        .then((results) => setData(results.data));
    }
  }, [itemLength, sortBy, type]);

  useEffect(() => {
    if (isNew) {
      func({style, id});
      setProp((props) => (props.isNew = false));
    }
  }, [isNew]);

  useEffect(() => {
    handleStyleChange({style, id});
  }, [style]);

  useEffect(() => {
    if (blockId) {
      blockApi
        .getBlockDetail(blockId)
        .then((data) => setBlockContent(data.data));
    }
  }, [blockId]);

  const componentRender = (item, index) => {
    if (blockContent.content) {
      const jsonBlock = JSON.parse(decode(blockContent.content));
      const componentData = genderComponentById(item, index, jsonBlock);
      return componentData;
    }
    return null;
  };
  const getStyleData = () => {
    if (blockContent.content) {
      const styleCustomize = decode(
        (blockContent.styles || {}).styleCustomize || '',
      );
      const style = decode((blockContent.styles || {}).style || '');
      return `${style} ${styleCustomize}`;
    }
    return '';
  };
  const column = getColumnSpan[cols] || getColumnSpan[2];
  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`${className}`}
      id={getId(id)}>
      <span
        className={`craft-block default-craft ${selected ? 'selected' : ''}`}
        data-id={`ProductBlock ${id}`}>
        <Row>
          {(data || []).map((item, index) => (
            <Col
              key={index}
              xl={column[0]}
              lg={column[1]}
              md={column[1]}
              sm={column[2]}
              xs={column[2]}
              style={{padding: `0 ${space || 0}`}}>
              {componentRender(flatten(item), index)}
            </Col>
          ))}
        </Row>
      </span>
      <style>{`${getStyleData()}`} </style>
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
        getBlockSelectMenu(childrenData),
        {
          key: 'filter',
          title: 'Filter',
          children: [
            {
              formType: formType.SUB_RADIO,
              keyItem: 'type',
              text: 'Type',
              value: propsNode.filter,
              children: [
                {
                  value: 'product',
                  text: 'Product',
                },
                {
                  value: 'product_category',
                  text: 'Product category',
                },
              ],
            },
            {
              formType: formType.INPUT,
              keyItem: 'space',
              text: 'Space',
              value: propsNode.filter,
            },
            {
              formType: formType.INPUT,
              keyItem: 'cols',
              text: 'Cols',
              value: propsNode.filter,
            },
            {
              formType: formType.INPUT,
              keyItem: 'itemLength',
              text: 'Item Length',
              value: propsNode.filter,
            },
            {
              formType: formType.INPUT,
              keyItem: 'sortBy',
              text: 'Sort by',
              value: propsNode.filter,
            },
          ],
        },
        ...getMenuDefault(childrenData),
        // getFontStyleMenu(childrenData),
      ]}
      handleSubmit={handleSubmit}
    />
  );
};

ProductBlock.craft = {
  displayName: 'ProductBlock',
  props: {
    text: 'Field',
    fontSize: 14,
    isNew: true,
    style: {},
    item: {},
  },
  related: {
    settings: SettingComponent,
  },
  rules: {
    canDrag: (node) => node.data.props.text != 'Drag',
  },
};
