"use client";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
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
    <div className={`${app} container ${isMobileLayout ? "my-2" : ""}`}>
      <div className="relative overflow-hidden rounded-[20px] shadow-[0_0_6px_rgba(0,0,0,0.4)] [&_div]:bg-transparent [&_.swiper-pagination]:bottom-[8px] [&_.swiper-pagination-bullet]:h-[7px] [&_.swiper-pagination-bullet]:w-[7px] [&_.swiper-pagination-bullet]:bg-white [&_.swiper-pagination-bullet]:opacity-50 [&_.swiper-pagination-bullet-active]:!w-[22px] [&_.swiper-pagination-bullet-active]:!opacity-100 [&_.swiper-pagination-bullet-active]:rounded-[4px]">
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
                <div className="h-[400px] rounded-[20px] max-md:h-[50vw] [&_a]:block [&_a]:h-full [&_img]:h-full [&_img]:w-full [&_img]:rounded-[20px] [&_img]:object-cover">
                  {title && (
                    <div className="absolute inset-x-0 top-0 z-[2] min-h-[50px] bg-gradient-to-b from-[#161616] to-transparent p-[10px] ps-[20px] text-start text-[16px] font-bold text-white">
                      {title}
                    </div>
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
