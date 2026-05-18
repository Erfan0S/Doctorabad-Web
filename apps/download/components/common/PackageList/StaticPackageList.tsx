import React from "react";
import { PackageListItemType } from "@/types/packages";
import { StaticMobileProductList } from "@repo/shared_modules/components";
import { productData } from ".";
import { Apps } from "@repo/core/types/general";

interface Props {
  packages: PackageListItemType[];
}

const StaticPackageList = ({ packages }: Props) => {
  return (
    <StaticMobileProductList
      products={packages.map(productData)}
      app={Apps.DOWNLOAD}
      emptyErrorMassage="هیچ پکیجی یافت نشد"
    />
  );
};

export default StaticPackageList;
