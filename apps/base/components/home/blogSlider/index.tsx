"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./BlogSlider.module.scss";
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
    <section className={style.blogSlider}>
      <div className="container">
        {(title || archiveLink) && (
          <div className={style.blogSliderHeader}>
            {title ? (
              <div className={style.blogSliderHeaderTitle}>
                <span>{title}</span>
              </div>
            ) : null}
            {archiveLink && (
              <div className={style.blogSliderHeaderLink}>
                <Link href={archiveLink} title={title} target={"_blank"}>
                  مشاهده بیشتر<LeftArrow width={16} height={16} />
                </Link>
              </div>
            )}
          </div>
        )}
        <div className={style.blogSliderSlider}>
          <Swiper
            spaceBetween={16}
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
