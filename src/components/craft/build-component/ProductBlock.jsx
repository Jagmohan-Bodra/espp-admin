import React, {useEffect, useState} from 'react';
import {Row, Col} from 'antd';
import {flatten} from '~/helpers/common';
import blockApi from '~/apis/api/block';
import productApi from '~/apis/api/product';
import categoryApi from '~/apis/api/category';
import {componentsBuild, getId} from './common';
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

export const ProductBlock = ({className, blockId, filter, id}) => {
  const [blockContent, setBlockContent] = useState({});
  const [data, setData] = useState([]);
  const {space, cols, itemLength, sortBy, type} = filter || {};

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
    <div className={`${className}`} id={getId(id)}>
      <span
        className={`craft-block default-craft`}
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

ProductBlock.craft = {
  displayName: 'ProductBlock',
  props: {
    text: 'Field',
    fontSize: 14,
    isNew: true,
    style: {},
    item: {},
  },
};
