import { AutoplayOptions, SwiperOptions } from 'swiper/types';

export const swiperBreakpoints = {
  0: {
    slidesPerView: 1.4,
  },
  768: {
    slidesPerView: 2.2,
  },
  992: {
    slidesPerView: 4.4,
  },
};

export const relatedSliderBreakpoints = {
  0: {
    slidesPerView: 1,
  },

  768: {
    slidesPerView: 2.2,
  },
  992: {
    slidesPerView: 2.6,
  },
};

export const categoryBannerBreakpoint = {
  0: {
    slidesPerView: 2.2,
  },
  768: {
    slidesPerView: 2.2,
  },
};

export const autoPlayConfig: AutoplayOptions = {
  delay: 3000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
};
