"use client";
import {
  autoPlayConfig,
  swiperBreakpoints,
} from "@repo/core/constants/sliders";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductPlaceHolder from "./product";
import "swiper/css";
import "swiper/css/autoplay";

const HEADER_CELL = "bg-white rounded-xl z-[2]";
const HEADER_BAR = "h-[30px] bg-[#d1d1d1] rounded-xl";

const ProductsPlaceholeder = () => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="w-full flex flex-row justify-between mb-5 relative before:content-[''] before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-[#d1d1d1] before:z-[1]">
          <div className={`${HEADER_CELL} pe-3`}>
            <div className={`${HEADER_BAR} w-[175px]`} />
          </div>
          <div className={`${HEADER_CELL} ps-3`}>
            <div className={`${HEADER_BAR} w-[115px]`} />
          </div>
        </div>
        <div className="market-slider-mask [&_.swiper]:max-w-[100vw] max-lg:[&_.swiper]:pl-[88px]">
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
