import { CourseDataType, CourseTab } from "@/types/courses";
import {
  MobileTabsConfig,
  MobileTabsConfigWithContent,
} from "@repo/core/types/configs";
import CourseContent from "./lessons";
import CourseDescription from "./Description";
import CourseComments from "./comments";
import RelatedCourses from "./Related";

export type CourseContentProps = {
  course: CourseDataType;
};

export const CourseTabsData = (
  props: CourseContentProps,
): MobileTabsConfigWithContent[] => [
  {
    id: CourseTab.LESSONS,
    title: "درس‌ها",
    content: <CourseContent {...props} />,
  },
  {
    id: CourseTab.DESCRIPTION,
    title: "توضیحات",
    content: <CourseDescription {...props} />,
  },
  {
    id: CourseTab.COMMENTS,
    title: "نظرات",
    content: <CourseComments {...props} />,
  },
  {
    id: CourseTab.RELATED_PRODUCTS,
    title: "مرتبط",
    content: <RelatedCourses {...props} />,
  },
];

export enum myCoursesTabs {
  COURSES = "courses",
  PLANS = "plans",
}

export const myCoursesTabsData: MobileTabsConfig[] = [
  {
    id: myCoursesTabs.COURSES,
    title: "دوره‌های من",
  },
  {
    id: myCoursesTabs.PLANS,
    title: "طرح‌های من",
  },
];
