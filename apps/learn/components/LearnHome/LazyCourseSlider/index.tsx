import { CourseListType, HomePageCourseSliders } from "@/types/homePage";
import { LazyDataLoader } from "@repo/shared_modules/components";
import React from "react";
import CourseSlider from "../CourseSlider";
import { api } from "@/api/Api";
import CourseSliderPlaceholder from "@/components/PlaceHolders/CourseSliderPlaceholder";

type Props = {
  type: HomePageCourseSliders;
};

const Test = () => <span>hi</span>;

const Configs = {
  [HomePageCourseSliders.Suggested]: {
    loader: () => api.getSuggestedCourses(),
    title: "پیشنهاد کدخدای دکترآباد",
    archiveLink: "/course_list/" + CourseListType.Suggested,
    queryKey: "suggested-courses",
  },

  [HomePageCourseSliders.Newest]: {
    loader: () => api.getNewestCourses(),
    title: "جدید‌ترین ها",
    archiveLink: "/course_list/" + CourseListType.Newest,
    queryKey: "newest-courses",
  },
  [HomePageCourseSliders.BestSeller]: {
    loader: () => api.getBestSellerCourses(),
    title: "پرفروش‌ترین ها",
    archiveLink: "/course_list/" + CourseListType.BestSeller,
    queryKey: "bestseller-courses",
  },

  [HomePageCourseSliders.LastViewed]: {
    loader: () => api.getUserLastViewedCourses(),
    title: "آخرین بازدید‌های من",
    archiveLink: null,
    queryKey: "lastviewed-courses",
  },

  [HomePageCourseSliders.MyCourses]: {
    loader: () => api.getUserLastViewedCourses(),
    title: "دوره‌ها و طرح‌های من",
    archiveLink: "/course_list/" + CourseListType.MyCourses,
    queryKey: "my-courses",
  },
};

export default function LazyCourseSlider({ type }: Props) {
  return (
    <LazyDataLoader
      placeHolder={() => <CourseSliderPlaceholder />}
      loader={Configs[type].loader}
      queryKey={Configs[type].queryKey}
      component={(d) => (
        <CourseSlider
          title={Configs[type].title}
          archiveLink={Configs[type].archiveLink}
          data={d.data}
        />
      )}
    />
  );
}
