"use client";
import { autoPlayConfig, swiperBreakpoints } from "@repo/core/constants";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductPlaceHolder from "./product";
import "swiper/css";
import "swiper/css/autoplay";
import style from "./productsPlaceholder.module.scss";

const ProductsPlaceholeder = () => {
  return (
    <section className={style.productSlider}>
      <div className="container">
        <div className={style.productSliderHeader}>
          <div className={style.productSliderHeaderTitle}>
            <div></div>
          </div>
          <div className={style.productSliderHeaderLink}>
            <div></div>
          </div>
        </div>
        <div className={style.sliderWrapper}>
          <Swiper
            spaceBetween={30}
            slidesPerView={"auto"}
            breakpoints={swiperBreakpoints}
            loop
          >
            {Array.from({ length: 10 }).map((item, i) => (
              <SwiperSlide key={i}>
                <ProductPlaceHolder />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProductsPlaceholeder;
