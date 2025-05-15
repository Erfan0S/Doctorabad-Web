import { ProductListProps, ProductListType } from "@repo/core/types/product";
import { Metadata } from "next";

export const generateProductListMetaData = ({
  params,
}: ProductListProps): Metadata => {
  const fallbackMetaData: Metadata = {
    title: "دکتر ااباد",
    description: "دکترآباد | سرزمین علوم پزشکی کشور",
  };

  const metaData = {
    [ProductListType.ARCHIVE]: {
      title: "دکترآباد | همه محصولات",
      description: "دکترآباد | سرزمین علوم پزشکی کشور",
    },
    [ProductListType.AMAZING]: {
      title: "دکترآباد | محصولات شگفت انگیز",
      description: "دکترآباد | سرزمین علوم پزشکی کشور",
    },
    [ProductListType.NEWEST]: {
      title: "دکترآباد | جدیدترین محصولات",
      description: "دکترآباد | سرزمین علوم پزشکی کشور",
    },
    [ProductListType.SUGGESTED]: {
      title: "دکترآباد | محصولات پیشنهادی",
      description: "دکترآباد | سرزمین علوم پزشکی کشور",
    },
    [ProductListType.SEARCH]: {
      title: "دکترآباد | جستجو محصولات ",
      description: "دکترآباد | سرزمین علوم پزشکی کشور",
    },
    [ProductListType.FESTIVAL]: {
      title: "دکترآباد | محصولات جشنواره ",
      description: "دکترآباد | سرزمین علوم پزشکی کشور",
    },
    [ProductListType.BEST_SELLING]: {
      title: "دکترآباد | پرفروش ترین محصولات ",
      description: "دکترآباد | سرزمین علوم پزشکی کشور",
    },
  };

  // @ts-ignore
  return metaData[params.type] || fallbackMetaData;
};
