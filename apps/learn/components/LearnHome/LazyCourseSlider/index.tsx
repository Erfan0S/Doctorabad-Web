import { CourseListType, HomePageCourseSliders } from "@/types/homePage";
import { LazyDataLoader } from "@repo/shared_modules/components";
import React from "react";
import CourseSlider from "../CourseSlider";
import { api } from "@/api/Api";
import CourseSliderPlaceholder from "@/components/PlaceHolders/CourseSliderPlaceholder";

type Props = {
  type: HomePageCourseSliders;
};

const Configs = {
  [HomePageCourseSliders.MyCourses]: {
    loader: async () =>
      (await api.getPrviosCourseOrders()).data.data ||
      (await api.getPreviosPlanOrders()).data.data,
    title: "دوره‌ها و طرح‌های من",
    archiveLink: "/my_course",
    queryKey: "my-courses",
  },
  [HomePageCourseSliders.Suggested]: {
    loader: async () => (await api.getSuggestedCourses()).data.data,
    title: "پیشنهاد کدخدای دکترآباد",
    archiveLink: "/course_list/" + CourseListType.Suggested,
    queryKey: "suggested-courses",
  },

  [HomePageCourseSliders.Newest]: {
    loader: async () => (await api.getNewestCourses()).data.data,
    title: "جدید‌ترین ها",
    archiveLink: "/course_list/" + CourseListType.Newest,
    queryKey: "newest-courses",
  },
  [HomePageCourseSliders.BestSeller]: {
    loader: async () => (await api.getBestSellerCourses()).data.data,
    title: "پرفروش‌ترین ها",
    archiveLink: "/course_list/" + CourseListType.BestSeller,
    queryKey: "bestseller-courses",
  },

  [HomePageCourseSliders.LastViewed]: {
    loader: async () => (await api.getUserLastViewedCourses()).data.data,
    title: "آخرین بازدید‌های من",
    archiveLink: null,
    queryKey: "lastviewed-courses",
  },
};

export default function LazyCourseSlider({ type }: Props) {
  return (
    <LazyDataLoader
      placeHolder={() => <CourseSliderPlaceholder />}
      loader={Configs[type].loader}
      queryKey={Configs[type].queryKey}
      returnOnError
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
