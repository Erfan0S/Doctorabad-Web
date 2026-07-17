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
          <div className="market-slider-header before:bg-[#33cc33]">
            {title ? (
              <div className="market-slider-header-title">
                <span className="leading-[30px] text-[22px] font-black">{title}</span>
              </div>
            ) : null}
            {archiveLink && (
              <div className="market-slider-header-link">
                <Link
                  href={archiveLink}
                  title={title}
                  target="_blank"
                  className="leading-7 inline-block rounded-lg px-4 text-sm font-medium text-white bg-[#33cc33] transition-all duration-150 hover:bg-orange"
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
