import React from 'react';
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
import {getId} from './common';

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
  const {className, componentprops, children, id} = props;
  const {effect, slidesPerView, scrollbar, pagination, spaceBetween} =
    componentprops || {};
  const column = getColumnSpan[slidesPerView] || getColumnSpan[1];

  return (
    <div>
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

export const SwiperDefaultProps = {
  isNew: true,
  style: {},
};

Swipers.craft = {
  displayName: 'Swiper',
  props: SwiperDefaultProps,
};
