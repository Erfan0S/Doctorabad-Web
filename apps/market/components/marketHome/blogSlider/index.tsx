"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import type { BlogType } from "@/types/blog";
import Blog from "@/components/common/blog";
import { swiperBreakpoints } from "@repo/core/constants/sliders";

interface Props {
  data: BlogType[];
  title?: string;
  archiveLink?: string;
}

const BlogSlider: React.FC<Props> = ({
  data,
  title = undefined,
  archiveLink = undefined,
}) => {
  return (
    <section className="py-10">
      <div className="container">
        {(title || archiveLink) && (
          <div className="market-slider-header before:bg-orange">
            {title && (
              <div className="market-slider-header-title">
                <span className="leading-[30px] text-sm font-bold">{title}</span>
              </div>
            )}
            {archiveLink && (
              <div className="market-slider-header-link">
                <Link
                  href={archiveLink}
                  title={title}
                  className="leading-7 border border-solid border-orange rounded-lg px-4 text-sm font-medium text-black transition-all duration-150 hover:bg-orange hover:text-white"
                >
                  مشاهده‌همه
                </Link>
              </div>
            )}
          </div>
        )}
        <div className="market-slider-mask">
          <Swiper
            spaceBetween={30}
            slidesPerView="auto"
            breakpoints={swiperBreakpoints}
          >
            {data.map((blog) => (
              <SwiperSlide key={blog.id}>
                <Blog {...blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BlogSlider;
