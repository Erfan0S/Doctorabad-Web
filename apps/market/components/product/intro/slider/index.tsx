"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import style from "./ProductSlider.module.scss";
import { SingleProductFile } from "@repo/core/types";
import "swiper/css";
import "swiper/css/pagination";
import { useRef, useState } from "react";
import Play from "@/assets/svg/play";
import { getAvatarType } from "@/utils/avatarUtils";
import { placeHolderDataUrl } from "@repo/core/constants";
import { MultimediaType } from "@repo/core/types";
import { MultimediaGallery } from "@/components/common/multimediaGallery/multimediaGallery";

interface Props {
  slider: SingleProductFile[];
  thumbnail: string;
  title: string;
}

const ProductSlider: React.FC<Props> = ({ slider, thumbnail, title }) => {
  const sliderItems = MultimediaGallery({
    containerSelector: "#productSlider",
    imageProps: { fill: true },
    config: [
      {
        src: thumbnail || placeHolderDataUrl,
        alt: title,
        type: MultimediaType.IMAGE,
      },
      ...slider.map((item) => {
        const type = getAvatarType(item);
        return {
          type,
          src: type === MultimediaType.IMAGE ? item.url : "",
          video_src: type === MultimediaType.VIDEO ? item.url : "",
          alt: title,
        };
      }),
    ],
    renderParent: (conf, mediaNode) => (
      <div className={style.productSliderItem}>{mediaNode}</div>
    ),
  });

  return (
    <div className={style.productSlider}>
      <Swiper
        id="productSlider"
        modules={[Pagination]}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        loop
      >
        {new Array(slider.length + 1).fill(0).map((_, i) => (
          <SwiperSlide key={i}>{sliderItems[i]}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
