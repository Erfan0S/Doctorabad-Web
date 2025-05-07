"use client";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import style from "./ProductSlider.module.scss";
import Link from "next/link";
import "swiper/css";
import { Loading } from "@repo/shared_modules/components";
import { useEffect, useState } from "react";
import { CourseListItemType } from "@/types/courses";
import { PaginatedResponse } from "@repo/core/types/general";
import Image from "next/image";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";

interface Props {
  data: PaginatedResponse<CourseListItemType[]>;
  title: string;
  archiveLink: string | null;
  isLoading?: boolean;
  customSliderConfig?: SwiperProps;
}

const CourseSlider: React.FC<Props> = ({
  customSliderConfig,
  data,
  isLoading,
  archiveLink,
  title,
}) => {
  const [slidesPerView, setSlidesPerView] = useState(1);
  const spaceBetween = 5; // Set your desired space between slides here

  useEffect(() => {
    const handleResize = () => {
      const containerWidth =
        document.querySelector(`.${style.productSliderSlider}`)?.clientWidth ||
        0;
      const slideWidth = 175; // Assume each slide has a fixed width of 200px
      const newSlidesPerView = containerWidth / (slideWidth + spaceBetween);
      setSlidesPerView(newSlidesPerView);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isLoading && !data?.data.length) return null;

  return (
    <section className={style.productSlider}>
      <div className="container">
        {(title || archiveLink) && (
          <div className={style.productSliderHeader}>
            {title && (
              <div className={style.productSliderHeaderTitle}>
                <span>{title}</span>
              </div>
            )}
            {archiveLink && (
              <div className={style.productSliderHeaderLink}>
                <Link href={archiveLink} title={title}>
                  مشاهده‌همه
                </Link>
              </div>
            )}
          </div>
        )}
        <div className={style.productSliderSlider}>
          {isLoading ? (
            <Loading color="red" />
          ) : (
            <Swiper
              // spaceBetween={150}
              slidesPerView={slidesPerView}
              spaceBetween={spaceBetween}
              speed={700}
              // breakpoints={swiperBreakpoints}
              {...customSliderConfig}
            >
              {data?.data?.map((course, i) => (
                <SwiperSlide key={course.id}>
                  <Link href={`/course/${course.id}`}>
                    <Image
                      className={style.course}
                      src={course.pic_url || placeHolderDataUrl}
                      alt={course.title || "دروس"}
                      width={175}
                      height={95}
                      placeholder={placeHolderDataUrl}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseSlider;
