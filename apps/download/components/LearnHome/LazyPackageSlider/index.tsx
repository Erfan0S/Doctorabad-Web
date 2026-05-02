import { CourseListType, HomePagePackageSliders } from "@/types/homePage";
import { LazyDataLoader } from "@repo/shared_modules/components";
import React from "react";
import CourseSlider from "../CourseSlider";
import { api } from "@/api/Api";
import CourseSliderPlaceholder from "@/components/PlaceHolders/PackageSliderPlaceholder";
import PackageSliderPlaceholder from "@/components/PlaceHolders/PackageSliderPlaceholder";

type Props = {
  type: HomePagePackageSliders;
};

type ConfigsType = {
  loader: () => Promise<any>;
  title: string;
  archiveLink: string | null;
  queryKey: string;
  isRefetchOnAuth?: boolean;
};

const Configs: Record<HomePagePackageSliders, ConfigsType> = {

  [HomePagePackageSliders.MyPackages]: {
    loader: async () =>
      (await api.getPreviousPackageOrders()).data,
    title:"محتواهای من",
    archiveLink: "/my_course",
    queryKey: "my-packages",
    isRefetchOnAuth: true,
  },
  [HomePagePackageSliders.Suggested]: {
    loader: async () => (await api.getPackages(1, "newest", 1)).data,
    title: "پیشنهاد کدخدای دکترآباد",
    archiveLink: "/course_list/" + CourseListType.Suggested,
    queryKey: "suggested-packages",
  },

  [HomePagePackageSliders.Newest]: {
    loader: async () => (await api.getPackages(1, "newest", 0)).data,
    title: "جدید‌ترین ها",
    archiveLink: "/course_list/" + CourseListType.Newest,
    queryKey: "newest-packages",
  },
  [HomePagePackageSliders.BestSelling]: {
    loader: async () => (await api.getPackages(1, "bestselling", 0)).data,
    title: "پرفروش‌ترین ها",
    archiveLink: "/course_list/" + CourseListType.BestSeller,
    queryKey: "bestselling-packages",
  },

  [HomePagePackageSliders.LastViewed]: {
    loader: async () => (await api.getUserLastViewedCourses()).data,
    title: "آخرین بازدید‌های من",
    archiveLink: null,
    queryKey: "lastviewed-packages",
    isRefetchOnAuth: true,
  },
};

export default function LazyPackageSlider({ type }: Props) {
  if (!Configs[type]) return null;
  return (
    <LazyDataLoader
      placeHolder={() => <PackageSliderPlaceholder />}
      loader={Configs[type].loader}
      queryKey={Configs[type].queryKey}
      returnOnError
      isRefetchOnAuth={Configs[type].isRefetchOnAuth}
      component={(d) => {
        return (
          <CourseSlider
            title={Configs[type].title}
            archiveLink={Configs[type].archiveLink || undefined}
            data={d.data.data}
            amazingTime={(d.data as any).amazing_time as string | undefined}
          />
        );
      }}
    />
  );
}
