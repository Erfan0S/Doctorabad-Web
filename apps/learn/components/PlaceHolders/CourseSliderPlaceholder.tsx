"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const CourseSliderPlaceholder = () => {
  const placeholderCards = Array(5).fill(null);

  return (
    <section>
      <div className="container">
        <div className="relative mb-2 flex items-center before:absolute before:inset-x-0 before:top-1/2 before:z-[1] before:h-px before:bg-[#a3a3a3] before:content-['']">
          <div className="relative z-[2] h-[23px] w-[150px] rounded-[50px] bg-[#b9b9b9] pe-3 before:absolute before:end-[-8px] before:z-[1] before:h-5 before:w-2 before:bg-white before:content-['']"></div>
          <div className="relative z-[2] ms-auto h-[21px] w-[100px] rounded-[50px] bg-[#c9c9c9] ps-3 before:absolute before:start-[-8px] before:h-5 before:w-2 before:bg-white before:content-['']"></div>
        </div>
        <div className="relative before:absolute before:bottom-0 before:end-[-15px] before:top-0 before:z-[1] before:w-[15px] before:bg-white before:content-[''] max-md:before:hidden [&_.swiper]:pb-3">
          <Swiper
            slidesPerView={4}
            spaceBetween={5}
            speed={0}
            allowTouchMove={false}
          >
            {placeholderCards.map((_, index) => (
              <SwiperSlide key={index}>
                <div className="h-[95px] w-full rounded-[10px] bg-[#e6e6e6] shadow-[0_0_10px_rgba(0,0,0,0.1)]" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CourseSliderPlaceholder;
