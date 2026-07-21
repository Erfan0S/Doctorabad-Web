import { EffectCards } from "swiper/modules";

import "swiper/css/effect-cards";

import { Swiper, SwiperSlide } from "swiper/react";
import { BookContentFile } from "@repo/core/types/bookContents";
import { getMediaType } from "@repo/core/utils/getMediaType";
import sanitize from "@repo/core/utils/sanitize";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import "photoswipe/style.css";
import { MultimediaGallery } from "../../multimediaGallery/multimediaGallery";

type Props = { items: BookContentFile[]; title: string };

export const Contents = ({ items, title }: Props) => {
  const gallery = MultimediaGallery({
    config: items.map((item) => {
      const mediaType = getMediaType(item.file_detail.url);

      return {
        alt: item.subtitle,
        src:
          item.file_detail.thumbnail ||
          item.file_detail.url ||
          placeHolderDataUrl,
        video_src: item.file_detail.url,
        type: mediaType,
      };
    }),
    imageProps: { fill: true },
    containerSelector: "#multiMediaContents",
  });

  return (
    <Swiper
      id="multiMediaContents"
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className="h-[calc(100%-20px)] w-[calc(100%-80px)] select-none !overflow-visible [&_.swiper-slide-shadow-cards]:hidden [&_.swiper-slide-active]:blur-[0px]"
    >
      {items.map(({ body, file_detail, subtitle }, i) => {
        return (
          <SwiperSlide
            className="p-[5px] blur-[1px] transition-all duration-300"
            key={file_detail.name}
          >
            <div className="flex h-full flex-col rounded-[15px] bg-white p-[10px] shadow-[0_0_5px_#b9b9b9]">
              <div className="relative mb-[10px] h-[180px] w-full flex-[0_0_180px] overflow-hidden rounded-[15px] shadow-[0_0_5px_#b9b9b9] [&_a]:block [&_img]:cursor-pointer [&_img]:object-cover">
                {gallery[i]}
              </div>
              <h5 className="rounded-[10px] bg-green text-center text-base leading-10 text-white">
                {title}
              </h5>
              <div className="relative mt-[15px] max-h-[calc(100%-225px)] flex-1 rounded-[15px] px-[10px] pb-[10px] pt-[30px] shadow-[0_0_5px_#b9b9b9]">
                <h6 className="absolute -top-[15px] left-1/2 -translate-x-1/2 list-none rounded-[10px] bg-green px-5 text-sm leading-[30px] text-white">
                  {subtitle}
                </h6>
                {body && (
                  <div
                    style={{ overflow: "auto", maxHeight: "100%" }}
                    dangerouslySetInnerHTML={{ __html: sanitize(body) }}
                  ></div>
                )}
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
