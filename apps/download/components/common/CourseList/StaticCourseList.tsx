import React from "react";
import { PackageListItemType } from "@/types/courses";
import { StaticMobileProductList } from "@repo/shared_modules/components";
import { productData } from ".";
import { Apps } from "@repo/core/types/general";

interface Props {
  packages: PackageListItemType[];
}

const StaticCourseList = ({ packages }: Props) => {
  return (
    <StaticMobileProductList
      products={packages.map(productData)}
      app={Apps.DOWNLOAD}
      emptyErrorMassage="هیچ دوره‌ای یافت نشد"
    />
  );
};

export default StaticCourseList;
