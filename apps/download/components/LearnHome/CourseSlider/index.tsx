"use client";
import { SwiperProps, SwiperSlide } from "swiper/react";
import style from "./ProductSlider.module.scss";
import Link from "next/link";
import "swiper/css";
import { CourseListItemType } from "@/types/courses";
import { Apps } from "@repo/core/types/general";
import Image from "next/image";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { ProductSliderContainer } from "@repo/shared_modules/components";

interface Props {
  data: CourseListItemType[];
  title: string;
  archiveLink?: string;
  isLoading?: boolean;
  customSliderConfig?: SwiperProps;
  amazingTime?: string;
}

const CourseSlider: React.FC<Props> = ({
  customSliderConfig,
  data,
  isLoading,
  archiveLink,
  title,
  amazingTime,
}) => {
  if (!isLoading && !(data.length > 0)) return null;

  return (
    <ProductSliderContainer
      title={title}
      archiveLink={archiveLink}
      customSliderConfig={customSliderConfig}
      app={Apps.DOWNLOAD}
      isMobileLayout
      amazingTime={amazingTime}
      dynamicSlideWidth
    >
      {data.map((course, i) => (
        <SwiperSlide key={course.id}>
          <Link href={`/course/${course.id}`}>
            <Image
              className={style.course}
              src={course.pic_url || placeHolderDataUrl}
              alt={course.title || "دروس"}
              width={170}
              height={95}
              placeholder={placeHolderDataUrl}
            />
          </Link>
        </SwiperSlide>
      ))}
    </ProductSliderContainer>
  );
};

export default CourseSlider;
