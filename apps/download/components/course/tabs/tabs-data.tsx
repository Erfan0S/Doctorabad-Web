import { PackageItem, CourseTab, TabData } from "@/types/courses";
import { MobileTabsConfigWithContent } from "@repo/core/types/configs";
import CourseDescription from "./Description";
import CourseComments from "./comments";
import RelatedCourses from "./Related";
import PackageSpecifications from "./Specifications";

export type CourseContentProps = {
  course: PackageItem;
};

export const CourseTabsData = (
  props: CourseContentProps,
): MobileTabsConfigWithContent[] => [
  {
    id: CourseTab.SPECIFICATIONS,
    title: "مشخصات",
    content: <PackageSpecifications {...props} />,
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
