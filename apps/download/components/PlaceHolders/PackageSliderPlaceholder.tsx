"use client";

import style from "./PlaceHolder.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PackageSliderPlaceholder = () => {
  const placeholderCards = Array(5).fill(null);

  return (
    <section className={style.productSlider}>
      <div className="container">
        <div className={style.productSliderHeader}>
          <div className={style.productSliderHeaderTitle}></div>
          <div className={style.productSliderHeaderLink}></div>
        </div>
        <div className={style.productSliderSlider}>
          <Swiper
            slidesPerView={4}
            spaceBetween={5}
            speed={0}
            allowTouchMove={false}
          >
            {placeholderCards.map((_, index) => (
              <SwiperSlide key={index}>
                <div className={`${style.course}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PackageSliderPlaceholder;
