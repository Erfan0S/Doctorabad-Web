// components/ClinicSlider/ClinicSlider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Slider } from "@/types/clinic";
import styles from "./ClinicSlider.module.scss";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { useRouter } from "next/navigation";

interface ClinicSliderProps {
  sliders: Slider[];
}

export default function ClinicSlider({ sliders }: ClinicSliderProps) {
  const router = useRouter();

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
            <div
              onClick={authorizeClientAction(() =>
                router.push(`/disease/${slider.clinic_id}`)
              )}
              className={styles.slide}
            >
              <img src={slider.picture} alt={slider.title || ""} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
