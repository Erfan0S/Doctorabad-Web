"use client";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import style from "./MainSlider.module.scss";
import "swiper/css/pagination";
import "swiper/css";

import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { autoPlayConfig } from "@repo/core/constants/sliders";
import { SwiperOptions } from "swiper/types";
import { MainSliderType } from "@repo/core/types/Sliders";
import { Apps } from "@repo/core/types/general";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  banners: MainSliderType[];
  swiperOptions?: SwiperOptions;
  isLoading?: boolean;
  app?: Apps;
  isMobileLayout?: boolean;
};

const MainSlider = ({
  banners,
  swiperOptions = {},
  isLoading,
  app = Apps.BASE,
  isMobileLayout = false,
}: Props) => {
  if (!banners.length) return null;

  return (
    <div
      className={`${style[app]} container ${isMobileLayout ? style.mobile : ""}`}
    >
      <div className={style.mainSlider}>
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={autoPlayConfig}
          slidesPerView={1}
          spaceBetween={30}
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
                  {title && (
                    <div className={style.mainSliderItemTitle}>{title}</div>
                  )}
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
