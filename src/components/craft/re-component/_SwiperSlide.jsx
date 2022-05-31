import React from 'react';
import {Element, useNode} from '@craftjs/core';
import {Container} from './Container';

export const SwiperSlide = ({children}) => {
  const {
    id,
    connectors: {connect, drag},
  } = useNode();
  return (
    <div ref={(ref) => connect(drag(ref))}>
      <Element
        is={Container}
        canvas
        id={`${id}`}
        style={{PC: {height: '100%'}}}>
        {children}
      </Element>
    </div>
  );
};

export const SwiperSlideDefaultProps = {
  style: {},
};

SwiperSlide.craft = {
  displayName: 'Swiper Slide',
  props: SwiperSlideDefaultProps,
};
