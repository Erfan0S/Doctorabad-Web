"use client";
import { SwiperProps, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CourseListItemType } from "@/types/courses";
import { Apps } from "@repo/core/types/general";
import { ProductSliderContainer } from "@repo/shared_modules/components";
import CourseSliderItem from "./CourseSliderItem";

interface Props {
  data: CourseListItemType[];
  title: string;
  archiveLink?: string;
  isLoading?: boolean;
  customSliderConfig?: SwiperProps;
  amazingTime?: string;
  isMyCourses?: boolean;
}

const CourseSlider: React.FC<Props> = ({
  customSliderConfig,
  data,
  isLoading,
  archiveLink,
  title,
  amazingTime,
  isMyCourses,
}) => {
  if (!isLoading && !(data.length > 0)) return null;

  return (
    <ProductSliderContainer
      title={title}
      archiveLink={archiveLink}
      customSliderConfig={customSliderConfig}
      app={Apps.LEARN}
      isMobileLayout
      amazingTime={amazingTime}
      dynamicSlideWidth
      slideWidth={177}
    >
      {data.map((course, i) => (
        <SwiperSlide key={course.id}>
          <CourseSliderItem course={course} isMyCourse={isMyCourses} />
        </SwiperSlide>
      ))}
    </ProductSliderContainer>
  );
};

export default CourseSlider;
