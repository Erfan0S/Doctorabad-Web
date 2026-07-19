// components/PharmacySlider/PharmacySlider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Slider } from "@/types/pharmacy";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { useRouter } from "next/navigation";

const swiperCls =
  "overflow-hidden rounded-2xl [&_.swiper-pagination]:bottom-2 [&_.swiper-pagination-bullet]:h-[7px] [&_.swiper-pagination-bullet]:w-[7px] [&_.swiper-pagination-bullet]:bg-white [&_.swiper-pagination-bullet]:opacity-50 [&_.swiper-pagination-bullet-active]:w-[22px] [&_.swiper-pagination-bullet-active]:rounded [&_.swiper-pagination-bullet-active]:opacity-100";

interface PharmacySliderProps {
  sliders: Slider[];
}

export default function PharmacySlider({ sliders }: PharmacySliderProps) {
  const router = useRouter();

  if (sliders.length === 0) return null;

  return (
    <div className="bg-white p-[16px] pb-6">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className={swiperCls}
      >
        {sliders.map((slider) => (
          <SwiperSlide key={slider.id}>
            <div
              onClick={authorizeClientAction(() =>
                router.push(`/medicine/${slider.medicine_id}`)
              )}
              className="aspect-video overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#64b5f6_0%,#42a5f5_100%)]"
            >
              <img
                src={slider.picture}
                alt={slider.title || ""}
                className="h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
