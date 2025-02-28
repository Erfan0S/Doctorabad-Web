"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import style from "./MainSlider.module.scss";
import "swiper/css/pagination";
import "swiper/css";

import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { autoPlayConfig } from "@repo/core/constants/sliders";
import { SwiperOptions } from "swiper/types";
import { SliderType } from "@/types/homePage";

type Props = {
  banners: SliderType[];
  swiperOptions?: SwiperOptions;
};

const MainSlider = ({ banners, swiperOptions = {} }: Props) => {
  if (!banners.length) return null;

  return (
    <div className="container">
      <div className={style.mainSlider}>
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={autoPlayConfig}
          slidesPerView={1}
          spaceBetween={-30}
          pagination={{ clickable: true }}
          loop
          {...swiperOptions}
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
    </div>
  );
};

export default MainSlider;
