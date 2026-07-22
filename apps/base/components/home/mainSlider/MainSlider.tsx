// components/home/MainSlider/MainSlider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { MainSliderItem } from "@/types/slider";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { useRouter } from "next/navigation";
import {
  routePath,
  clinicPaths,
  pharmacyPaths,
  examPaths,
} from "@repo/core/constants/routePath";

interface MainSliderProps {
  sliders: MainSliderItem[];
}

const SWIPER_CLS =
  "rounded-[16px] overflow-hidden [&_.swiper-pagination]:bottom-2 [&_.swiper-pagination-bullet]:bg-white [&_.swiper-pagination-bullet]:opacity-50 [&_.swiper-pagination-bullet]:w-[7px] [&_.swiper-pagination-bullet]:h-[7px] [&_.swiper-pagination-bullet-active]:opacity-100 [&_.swiper-pagination-bullet-active]:w-[22px] [&_.swiper-pagination-bullet-active]:rounded-[4px]";

function getSliderHref(slider: MainSliderItem): string | null {
  if (slider.url) return slider.url;
  if (slider.entity_type && slider.entity_id != null) {
    switch (slider.entity_type) {
      case "clinic":
        return `${routePath.clinicBasePath}${clinicPaths.single}/${slider.entity_id}`;
      case "medicine":
        return `${routePath.pharmacyBasePath}${pharmacyPaths.single}/${slider.entity_id}`;
      case "exam":
        return `${routePath.examBasePath}${examPaths.single}/${slider.entity_id}`;
      default:
        return null;
    }
  }
  return null;
}

export default function MainSlider({ sliders }: MainSliderProps) {
  const router = useRouter();

  if (sliders.length === 0) return null;

  return (
    <div className="container">
      <div className="bg-white pt-4 pb-6">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className={SWIPER_CLS}
          loop
        >
          {sliders.map((slider) => {
            const href = getSliderHref(slider);
            return (
              <SwiperSlide key={slider.id}>
                <div
                  onClick={
                    href
                      ? authorizeClientAction(() => {
                          if (href.startsWith("http")) {
                            window.open(href, "_blank");
                          } else {
                            router.push(href);
                          }
                        })
                      : undefined
                  }
                  className="aspect-[16/9] overflow-hidden rounded-[16px] [background:linear-gradient(135deg,#64b5f6_0%,#42a5f5_100%)]"
                  style={href ? { cursor: "pointer" } : undefined}
                >
                  <img
                    src={slider.picture}
                    alt={slider.title || ""}
                    className="h-full w-full object-cover"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
