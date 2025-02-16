import { api } from "@/api/Api";
import { CourseListType } from "@/types/homePage";

export const CourseListConfigs = {
  [CourseListType.Suggested]: {
    title: "پیشنهاد کدخدای دکترآباد",
    api: () => api.getSuggestedCourses(),
  },
  [CourseListType.Newest]: {
    title: "جدید‌ترین ها",
    api: () => api.getNewestCourses(),
  },
  [CourseListType.BestSeller]: {
    title: "پرفروش‌ترین ها",
    api: () => api.getBestSellerCourses(),
  },
};
