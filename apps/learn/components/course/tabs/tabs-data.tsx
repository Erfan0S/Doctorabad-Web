import { CourseTab, TabData } from "@/types/courses";

export const CourseTabsData = [
  {
    id: CourseTab.LESSONS,
    title: "درس‌ها",
  },
  {
    id: CourseTab.DESCRIPTION,
    title: "توضیحات",
  },
  {
    id: CourseTab.COMMENTS,
    title: "نظرات",
  },
  {
    id: CourseTab.RELATED_PRODUCTS,
    title: "مرتبط",
  },
];

export enum myCoursesTabs {
  COURSES = "courses",
  PLANS = "plans",
}

export const myCoursesTabsData: TabData[] = [
  {
    id: myCoursesTabs.COURSES,
    title: "دوره‌های من",
  },
  {
    id: myCoursesTabs.PLANS,
    title: "طرح‌های من",
  },
];
