"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { autoPlayConfig } from "@repo/core/constants";
import { testimonialsData } from "./testimonials-data";
import TestimonialsItem from "./TestimonialsItem";
import style from "./Testimonials.module.scss";
const Testimonials = () => {
  return (
    <section className={style.testimonials}>
      <div className="container">
        <Swiper
          modules={[Autoplay]}
          autoplay={autoPlayConfig}
          freeMode
          loop
          speed={700}
          slidesPerView={1.2}
          spaceBetween={30}
          breakpoints={{
            992: { slidesPerView: 3 },
            768: { slidesPerView: 1.5 },
          }}
        >
          {testimonialsData.map((item, index) => (
            <SwiperSlide key={index}>
              <TestimonialsItem {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
