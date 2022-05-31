import React from 'react';
import {useNode} from '@craftjs/core';
import {Carousel as AntdCarousel} from 'antd';

export const Carousel = (props) => {
  const {
    connectors: {connect, drag},
  } = useNode();
  return (
    <div ref={(ref) => connect(drag(ref))}>
      <AntdCarousel autoplay {...props}>
        <div>1</div>
        <div>2</div>
        {(props.data || []).map((item) => item)}
      </AntdCarousel>
    </div>
  );
};

export const CarouselDefaultProps = {};

Carousel.craft = {
  props: CarouselDefaultProps,
};
