"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { sliderData } from "./slider-data";
import Link from "next/link";
import Image from "next/image";
import style from "./MainSlider.module.scss";
import "swiper/css/pagination";
import "swiper/css";

import { Banner } from "@/types/banner";
import { placeHolderDataUrl } from "@repo/core/constants";
import { autoPlayConfig } from "@/constants/sliders";

type Props = {
  banners: Banner[];
};

const MainSlider = ({ banners }: Props) => {
  return (
    <div className={style.mainSlider}>
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={autoPlayConfig}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        loop
      >
        {banners.map(({ id, pic_url, url, title }) => {
          const ImageComponent = () => (
            <Image
              src={pic_url}
              alt={title || "Slider"}
              fill
              placeholder={placeHolderDataUrl}
              fetchPriority="high"
            />
          );
          return (
            <SwiperSlide key={id}>
              <div className={style.mainSliderItem}>
                {url ? (
                  <Link href={url}>
                    <ImageComponent />
                  </Link>
                ) : (
                  <ImageComponent />
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MainSlider;
