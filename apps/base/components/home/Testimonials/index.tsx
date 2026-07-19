"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { autoPlayConfig } from "@repo/core/constants/sliders";
import { testimonialsData } from "./testimonials-data";
import TestimonialsItem from "./TestimonialsItem";
const Testimonials = () => {
  return (
    <section className="[&_.swiper]:-mx-[10px] [&_.swiper]:my-0 [&_.swiper]:px-[10px] [&_.swiper]:py-[15px]">
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
