import React, {useEffect} from 'react';
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
import {useEditor, useNode, Element} from '@craftjs/core';
import {Container} from './Container';
import BlockLayoutCollapse from '../editor_layout/layout-menu/BlockLayoutCollapse';
import {getChildrenData, getMenuDefault, getSwiperStyleMenu} from './menu-data';
import {debounce} from '~/helpers/common';
import {useSelector} from 'react-redux';

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
  12: [12, 8, 6],
};

export const Swipers = (props) => {
  const {className, style, componentprops, children, isNew} = props;
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
  }, 150);

  useEffect(() => {
    if (isNew) {
      func({style, id});
      setProp((props) => (props.isNew = false));
    }
  }, [isNew]);

  useEffect(() => {
    handleStyleChange({style, id});
  }, [style]);

  const {effect, slidesPerView, scrollbar, pagination, spaceBetween} =
    componentprops || {};
  const column = getColumnSpan[slidesPerView] || getColumnSpan[1];
  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className={`craft-block ${selected ? 'selected' : ''} excep`}
      data-id={`Swiper ${id}`}
      key={isNew}>
      <Swiper
        id={getId(id)}
        className={`${className || ''}`}
        effect={effect}
        navigation={true}
        pagination={pagination ? {clickable: true} : false}
        scrollbar={scrollbar ? {draggable: true} : false}
        breakpoints={{
          375: {
            slidesPerView: column[2],
            spaceBetween: spaceBetween || 0,
          },
          768: {
            slidesPerView: column[2],
            spaceBetween: spaceBetween || 0,
          },
          1024: {
            slidesPerView: column[1],
            spaceBetween: spaceBetween || 0,
          },
          1440: {
            slidesPerView: column[0],
            spaceBetween: spaceBetween || 0,
          },
        }}
        virtual
        followFinger={false}>
        {(((children || {}).props || {}).children || []).map(
          (slideContent, index) => (
            <SwiperSlide key={`${index}`} virtualIndex={index}>
              {slideContent}
            </SwiperSlide>
          ),
        )}
      </Swiper>
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
      menu={[getSwiperStyleMenu(childrenData), ...getMenuDefault(childrenData)]}
      handleSubmit={handleSubmit}
    />
  );
};

const addSwiperSlide = () => {
  const {id} = useNode();
  const {actions, query} = useEditor();
  const {createNode} = query;
  const nodeData = createNode(<Element is={SwiperSlide} isNew={true} />);
  actions.add(nodeData, id);
};

export const SwiperDefaultProps = {
  isNew: true,
  style: {},
};

Swipers.craft = {
  displayName: 'Swiper',
  props: SwiperDefaultProps,
  related: {
    settings: SettingComponent,
    addSwiperSlide: addSwiperSlide,
  },
  rules: {
    canMoveIn: (incomingNode) => incomingNode.data.type == Container,
  },
};
