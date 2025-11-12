import { CourseListType, HomePageCourseSliders } from "@/types/homePage";
import { LazyDataLoader } from "@repo/shared_modules/components";
import React from "react";
import CourseSlider from "../CourseSlider";
import { api } from "@/api/Api";
import CourseSliderPlaceholder from "@/components/PlaceHolders/CourseSliderPlaceholder";

type Props = {
  type: HomePageCourseSliders;
};

type ConfigsType = {
  loader: () => Promise<any>;
  title: string;
  archiveLink: string | null;
  queryKey: string;
  isRefetchOnAuth?: boolean;
};

const Configs: Record<HomePageCourseSliders, ConfigsType> = {
  [HomePageCourseSliders.Amazing]: {
    loader: async () => (await api.getAmazingCourses()).data,
    title: "شگفت‌انگیزان",
    archiveLink: "/course_list/" + CourseListType.Amazing,
    queryKey: "amazing-courses",
  },
  [HomePageCourseSliders.MyCourses]: {
    loader: async () =>
      (await api.getPrviosCourseOrders()).data ||
      (await api.getPreviosPlanOrders()).data,
    title: "دوره‌ها و طرح‌های من",
    archiveLink: "/my_course",
    queryKey: "my-courses",
    isRefetchOnAuth: true,
  },
  [HomePageCourseSliders.Suggested]: {
    loader: async () => (await api.getSuggestedCourses()).data,
    title: "پیشنهاد کدخدای دکترآباد",
    archiveLink: "/course_list/" + CourseListType.Suggested,
    queryKey: "suggested-courses",
  },

  [HomePageCourseSliders.Newest]: {
    loader: async () => (await api.getNewestCourses()).data,
    title: "جدید‌ترین ها",
    archiveLink: "/course_list/" + CourseListType.Newest,
    queryKey: "newest-courses",
  },
  [HomePageCourseSliders.BestSeller]: {
    loader: async () => (await api.getBestSellerCourses()).data,
    title: "پرفروش‌ترین ها",
    archiveLink: "/course_list/" + CourseListType.BestSeller,
    queryKey: "bestseller-courses",
  },

  [HomePageCourseSliders.LastViewed]: {
    loader: async () => (await api.getUserLastViewedCourses()).data,
    title: "آخرین بازدید‌های من",
    archiveLink: null,
    queryKey: "lastviewed-courses",
    isRefetchOnAuth: true,
  },
};

export default function LazyCourseSlider({ type }: Props) {
  if (!Configs[type]) return null;
  return (
    <LazyDataLoader
      placeHolder={() => <CourseSliderPlaceholder />}
      loader={Configs[type].loader}
      queryKey={Configs[type].queryKey}
      returnOnError
      isRefetchOnAuth={Configs[type].isRefetchOnAuth}
      component={(d) => {
        return (
          <CourseSlider
            title={Configs[type].title}
            archiveLink={Configs[type].archiveLink}
            data={d.data.data}
            amazingTime={(d.data as any).amazing_time as string | undefined}
          />
        );
      }}
    />
  );
}
