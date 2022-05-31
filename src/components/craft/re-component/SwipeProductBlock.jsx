import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {
  Virtual,
  EffectCube,
  EffectFade,
  EffectCoverflow,
  EffectFlip,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper';
import 'swiper/swiper-bundle.css';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import {getId, handleStyleChange} from './common';
import {useNode} from '@craftjs/core';
import {Container} from './Container';
import BlockLayoutCollapse, {
  formType,
} from '../editor_layout/layout-menu/BlockLayoutCollapse';
import {
  getBlockSelectMenu,
  getChildrenData,
  getMenuDefault,
  getSwiperStyleMenu,
} from './menu-data';
import {debounce, flatten} from '~/helpers/common';
import {useSelector} from 'react-redux';
import blockApi from '~/apis/api/block';
import productApi from '~/apis/api/product';
import categoryApi from '~/apis/api/category';
import {decode} from '../common/util';
import {componentsBuild} from '../build-component/common';

SwiperCore.use([Virtual]);
SwiperCore.use([EffectCube]);
SwiperCore.use([EffectFade]);
SwiperCore.use([EffectCoverflow]);
SwiperCore.use([EffectFlip]);
SwiperCore.use([Navigation]);
SwiperCore.use([Pagination]);
SwiperCore.use([Scrollbar]);
SwiperCore.use([A11y]);

const func = debounce((value) => {
  handleStyleChange(value);
}, 150);

const getColumnSpan = {
  1: [1, 1, 1],
  2: [2, 1, 1],
  3: [3, 2, 1],
  4: [4, 3, 2],
  5: [5, 3, 2],
  6: [6, 4, 3],
  7: [7, 5, 3],
  8: [8, 6, 4],
  9: [9, 7, 4],
  10: [10, 8, 6],
  11: [11, 8, 6],
  12: [11, 8, 6],
};

const genderComponentById = (
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

// function useWindowSize() {
//   const [size, setSize] = useState([0, 0]);
//   useLayoutEffect(() => {
//     function updateSize() {
//       setSize([window.innerWidth, window.innerHeight]);
//     }
//     window.addEventListener('resize', updateSize);
//     updateSize();
//     return () => window.removeEventListener('resize', updateSize);
//   }, []);
//   return size;
// }

export const SwipeProductBlock = (props) => {
  const {className, style, componentprops, filter, isNew, blockId} = props;
  const [blockContent, setBlockContent] = useState({});
  const [data, setData] = useState([]);
  const {cols, itemLength, sortBy, type} = filter || {};
  const {effect, scrollbar, pagination} = componentprops || {};
  // const [width, height] = useWindowSize();
  // console.log(width, height);
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
    if (blockId) {
      blockApi
        .getBlockDetail(blockId)
        .then((data) => setBlockContent(data.data));
    }
  }, [blockId]);

  useEffect(() => {
    if (isNew) {
      func({style, id});
      setProp((props) => (props.isNew = false));
    }
  }, [isNew]);

  useEffect(() => {
    handleStyleChange({style, id});
  }, [style]);

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
      className={`craft-block ${selected ? 'selected' : ''} excep`}
      data-id={`SwipeProductBlock ${id}`}
      key={isNew}>
      <Swiper
        id={getId(id)}
        className={`${className || ''}`}
        effect={effect}
        // slidesPerView={column[0]}
        slidesPerView="auto"
        breakpoints={{
          375: {
            slidesPerView: column[2],
            spaceBetween: 20,
          },
          768: {
            slidesPerView: column[2],
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: column[1],
            spaceBetween: 40,
          },
          1440: {
            slidesPerView: column[0],
            spaceBetween: 50,
          },
        }}
        navigation={true}
        pagination={pagination ? {clickable: true} : false}
        scrollbar={scrollbar ? {draggable: true} : false}
        virtual
        followFinger={false}>
        {(data || []).map((item, index) => (
          <SwiperSlide key={`${index}`} virtualIndex={index}>
            {componentRender(flatten(item), index)}
          </SwiperSlide>
        ))}
      </Swiper>
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
      setProp((props) => (props.style[screenMode] = value || ''));
      setProp((props) => (props.isNew = true));
      return;
    }
    setProp((props) => (props[key] = value || ''));
    setProp((props) => (props.isNew = true));
  };

  const childrenData = getChildrenData({
    ...propsNode,
    style: (propsNode.style || {})[screenMode] || {},
  });

  return (
    <BlockLayoutCollapse
      menu={[
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
        getSwiperStyleMenu(childrenData),
        ...getMenuDefault(childrenData),
      ]}
      handleSubmit={handleSubmit}
    />
  );
};

export const SwiperDefaultProps = {
  isNew: true,
  style: {},
};

SwipeProductBlock.craft = {
  displayName: 'SwipeProductBlock',
  props: SwiperDefaultProps,
  related: {
    settings: SettingComponent,
  },
  rules: {
    canMoveIn: (incomingNode) => incomingNode.data.type == Container,
  },
};
