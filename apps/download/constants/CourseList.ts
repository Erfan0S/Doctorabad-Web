import { api } from "@/api/Api";
import { CourseListType } from "@/types/homePage";

export const CourseListConfigs = {
  [CourseListType.Amazing]: {
    title: "شگفت‌انگیزان",
    api: (pageParam: number) => api.getAmazingCourses(pageParam),
  },
  [CourseListType.Suggested]: {
    title: "پیشنهاد کدخدای دکترآباد",
    api: (pageParam: number) => api.getSuggestedCourses(pageParam),
  },
  [CourseListType.Newest]: {
    title: "جدید‌ترین ها",
    api: (pageParam: number) => api.getNewestCourses(pageParam),
  },
  [CourseListType.BestSeller]: {
    title: "پرفروش‌ترین ها",
    api: (pageParam: number) => api.getBestSellerCourses(pageParam),
  },
};
