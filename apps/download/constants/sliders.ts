import { AutoplayOptions } from "swiper/types";

export const swiperBreakpoints = {
  0: {
    slidesPerView: 3.3,
    spaceBetween: 100,
  },
  576: {
    slidesPerView: 3.5,
    spaceBetween: 120,
  },
  768: {
    slidesPerView: 4.4,
    spaceBetween: 150,
  },
  // 992: {
  //   slidesPerView: 4.4,
  // },
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
