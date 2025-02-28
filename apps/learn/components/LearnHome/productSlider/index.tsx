"use client";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import style from "./ProductSlider.module.scss";
import Link from "next/link";
import "swiper/css";
import { autoPlayConfig, swiperBreakpoints } from "@/constants/sliders";
import { Autoplay } from "swiper/modules";
import { CourseListType, HomePageCourseSliders } from "@/types/homePage";
import { api } from "@/api/Api";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@repo/shared_modules/components";
import { useEffect, useState } from "react";

interface Props {
  type: HomePageCourseSliders;
  customSliderConfig?: SwiperProps;
}

const Configs = {
  [HomePageCourseSliders.Suggested]: {
    loader: () => api.getSuggestedCourses(),
    title: "پیشنهاد کدخدای دکترآباد",
    archiveLink: "/learn/course_list/" + CourseListType.Suggested,
  },

  [HomePageCourseSliders.Newest]: {
    loader: () => api.getNewestCourses(),
    title: "جدید‌ترین ها",
    archiveLink: "/learn/course_list/" + CourseListType.Newest,
  },
  [HomePageCourseSliders.BestSeller]: {
    loader: () => api.getBestSellerCourses(),
    title: "پرفروش‌ترین ها",
    archiveLink: "/learn/course_list/" + CourseListType.BestSeller,
  },

  [HomePageCourseSliders.LastViewed]: {
    loader: () => api.getUserLastViewedCourses(),
    title: "آخرین بازدید‌های من",
    archiveLink: null,
  },
};

const CourseSlider: React.FC<Props> = ({ type, customSliderConfig }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["courses", type],
    queryFn: Configs[type].loader,
  });

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

  const { title, archiveLink } = Configs[type];

  if (!isLoading && !data?.data.data.length) return null;

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
            <Loading />
          ) : (
            <Swiper
              modules={[Autoplay]}
              autoplay={autoPlayConfig}
              // spaceBetween={150}
              slidesPerView={slidesPerView}
              spaceBetween={spaceBetween}
              speed={700}
              // breakpoints={swiperBreakpoints}
              {...customSliderConfig}
            >
              {data?.data?.data?.map((course, i) => (
                <SwiperSlide key={course.id}>
                  <Link href={`/learn/course/${course.id}`}>
                    <div
                      className={style.course}
                      style={{ backgroundImage: `url(${course.pic_url})` }}
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
