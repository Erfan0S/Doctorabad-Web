// components/PharmacySlider/PharmacySlider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Slider } from "@/types/pharmacy";
import styles from "./PharmacySlider.module.scss";

interface PharmacySliderProps {
  sliders: Slider[];
}

export default function PharmacySlider({ sliders }: PharmacySliderProps) {
  if (sliders.length === 0) return null;

  return (
    <div className={styles.sliderSection}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className={styles.swiper}
      >
        {sliders.map((slider) => (
          <SwiperSlide key={slider.id}>
            <div className={styles.slide}>
              <img src={slider.picture} alt={slider.title || ""} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}