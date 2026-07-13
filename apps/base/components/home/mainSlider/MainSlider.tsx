// components/home/MainSlider/MainSlider.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { MainSliderItem } from "@/types/slider";
import styles from "./MainSlider.module.scss";
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

    <div className={styles.sliderSection}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className={styles.swiper}
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
                className={styles.slide}
                style={href ? { cursor: "pointer" } : undefined}
              >
                <img src={slider.picture} alt={slider.title || ""} />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
    </div>
  );
}
