"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import type { BlogType } from "@/types/blog";
import Blog from "@/components/common/blog";
import { swiperBreakpoints } from "@repo/core/constants/sliders";
import { LeftArrow } from "@/assets/svg/leftArrow";

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
          <div className="mb-4 flex items-center justify-between">
            {title ? (
              <div className="bg-transparent pl-0 text-[#141f23]">
                <span className="text-xl font-extrabold leading-[1.2] max-[768px]:text-[1.1rem]">{title}</span>
              </div>
            ) : null}
            {archiveLink && (
              <div className="mr-0 bg-transparent pr-0">
                <Link
                  href={archiveLink}
                  title={title}
                  target={"_blank"}
                  className="flex items-center gap-1 rounded-none bg-transparent p-0 text-[0.9rem] font-medium leading-none text-[#afafaf] max-[768px]:text-[0.7rem]"
                >
                  مشاهده بیشتر
                  <LeftArrow width={16} height={16} />
                </Link>
              </div>
            )}
          </div>
        )}
        <div className="relative px-[6px] [&_.swiper]:px-0 [&_.swiper]:pb-4 [&_.swiper]:pt-[10px] [&_.swiper-slide]:!w-[250px] [&_.swiper-slide]:!max-w-none max-[768px]:[&_.swiper-slide]:!w-[160px]">
          <Swiper
            spaceBetween={16}
            slidesPerView="auto"
            // breakpoints={swiperBreakpoints}
            // loop={true}
            // loopAdditionalSlides={6}
            // loopPreventsSliding={true}
            watchOverflow={true}
            observer={true}
            observeParents={true}
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
