"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { SingleProductFile } from "@repo/core/types/product";
import "swiper/css";
import "swiper/css/pagination";
import { getAvatarType } from "@/utils/avatarUtils";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { MultimediaType } from "@repo/core/types/general";
import { MultimediaGallery } from "@repo/shared_modules/components";

// slide frame + centered play button overlay (svg) + media sizing
const ITEM_CLASS =
  "relative z-10 h-[326px] rounded-2xl border-2 border-solid border-orange [&_img]:max-h-full [&_img]:max-w-full [&_img]:rounded-2xl [&_video]:h-full [&_video]:max-h-full [&_video]:max-w-full [&_video]:cursor-pointer [&_video]:rounded-2xl [&_svg]:pointer-events-none [&_svg]:absolute [&_svg]:left-1/2 [&_svg]:top-1/2 [&_svg]:h-[50px] [&_svg]:w-[50px] [&_svg]:-translate-x-1/2 [&_svg]:-translate-y-1/2 [&_svg]:rounded-full [&_svg]:bg-black/25 [&_svg]:p-3 [&_svg]:text-white";

interface Props {
  slider: SingleProductFile[];
  thumbnail: string;
  title: string;
  isMobileLayout?: boolean;
}

const ProductSlider: React.FC<Props> = ({
  slider,
  thumbnail,
  title,
  isMobileLayout,
}) => {
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
      <div
        className={`${ITEM_CLASS} ${
          isMobileLayout ? "[@media(max-height:700px)]:h-[225px]" : ""
        }`}
      >
        {mediaNode}
      </div>
    ),
  });

  return (
    <div className="max-lg:mb-6 [&_.swiper]:-mb-2 [&_.swiper]:pb-2 [&_.swiper-pagination]:bottom-0 [&_.swiper-pagination]:flex [&_.swiper-pagination]:items-center [&_.swiper-pagination]:justify-center [&_.swiper-pagination-bullet]:h-4 [&_.swiper-pagination-bullet]:w-4 [&_.swiper-pagination-bullet]:border-2 [&_.swiper-pagination-bullet]:border-solid [&_.swiper-pagination-bullet]:border-orange [&_.swiper-pagination-bullet]:bg-white [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet.swiper-pagination-bullet-active]:bg-orange">
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
