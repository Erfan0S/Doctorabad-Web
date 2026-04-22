import React from "react";
import { CourseListItemType } from "@/types/courses";
import { StaticMobileProductList } from "@repo/shared_modules/components";
import { productData } from ".";
import { Apps } from "@repo/core/types/general";

interface Props {
  courses: CourseListItemType[];
}

const StaticCourseList = ({ courses }: Props) => {
  return (
    <StaticMobileProductList
      products={courses.map(productData)}
      app={Apps.DOWNLOAD}
      emptyErrorMassage="هیچ دوره‌ای یافت نشد"
    />
  );
};

export default StaticCourseList;
