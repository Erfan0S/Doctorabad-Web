import { PackageItem, PackageTab, TabData } from "@/types/packages";
import { MobileTabsConfigWithContent } from "@repo/core/types/configs";
import PackageDescription from "./Description";
import PackageComments from "./comments";
import RelatedPackages from "./Related";
import PackageSpecifications from "./Specifications";

export type PackageContentProps = {
  packageItem: PackageItem;
};

export const PackageTabsData = (
  props: PackageContentProps,
): MobileTabsConfigWithContent[] => [
  {
    id: PackageTab.SPECIFICATIONS,
    title: "مشخصات",
    content: <PackageSpecifications packageItem={props.packageItem} />,
  },
  {
    id: PackageTab.DESCRIPTION,
    title: "توضیحات",
    content: <PackageDescription packageItem={props.packageItem} />,
  },
  {
    id: PackageTab.COMMENTS,
    title: "نظرات",
    content: <PackageComments packageItem={props.packageItem} />,
  },
  {
    id: PackageTab.RELATED_PRODUCTS,
    title: "مرتبط",
    content: <RelatedPackages packageItem={props.packageItem} />,
  },
];

export enum myPackagesTabs {
  PACKAGES = "packages",
  PLANS = "plans",
}

export const myPackagesTabsData: TabData[] = [
  {
    id: myPackagesTabs.PACKAGES,
    title: "پکیج‌های من",
  },
  {
    id: myPackagesTabs.PLANS,
    title: "طرح‌های من",
  },
];
