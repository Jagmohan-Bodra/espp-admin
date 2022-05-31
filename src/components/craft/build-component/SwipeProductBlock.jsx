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
import {flatten} from '~/helpers/common';
import blockApi from '~/apis/api/block';
import productApi from '~/apis/api/product';
import categoryApi from '~/apis/api/category';
import {decode} from '../common/util';
import {componentsBuild, getId} from './common';

SwiperCore.use([Virtual]);
SwiperCore.use([EffectCube]);
SwiperCore.use([EffectFade]);
SwiperCore.use([EffectCoverflow]);
SwiperCore.use([EffectFlip]);
SwiperCore.use([Navigation]);
SwiperCore.use([Pagination]);
SwiperCore.use([Scrollbar]);
SwiperCore.use([A11y]);

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

export const SwipeProductBlock = (props) => {
  const {className, componentprops, filter, blockId, id} = props;
  const [blockContent, setBlockContent] = useState({});
  const [data, setData] = useState([]);
  const {cols, itemLength, sortBy, type} = filter || {};
  const {effect, scrollbar, pagination} = componentprops || {};
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
    <div className={`craft-block excep`} data-id={`SwipeProductBlock ${id}`}>
      <Swiper
        id={getId(id)}
        className={`${className || ''}`}
        effect={effect}
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

export const SwiperDefaultProps = {
  isNew: true,
  style: {},
};

SwipeProductBlock.craft = {
  displayName: 'SwipeProductBlock',
  props: SwiperDefaultProps,
};
