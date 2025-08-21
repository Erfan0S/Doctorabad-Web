import React from "react";
import { PageHeader } from "@repo/shared_modules/headers";
import styles from "./CategoryListHeader.module.scss";
import { SortType } from "@/types/filters";
import { Apps } from "@repo/core/types/general";
import { Accordion } from "@repo/shared_modules/components";

type Props = {
  title: string;
};

const filterData = [
  { id: SortType.BESTSELLING, title: "پرفروش ترین" },
  { id: SortType.NEWEST, title: "جدیدترین" },
  { id: SortType.CHEAPEST, title: "ارزان ترین" },
  { id: SortType.EXPENSIVE, title: "گران ترین" },
  { id: SortType.FAVORITE, title: "محبوب ترین" },
];

const CategoryListHeader = ({ title }: Props) => {
  return (
    <PageHeader
      title={title}
      app={Apps.LEARN}
      children={
        <Accordion
          title="نمایش براساس..."
          className={styles.filter}
          items={filterData}
          queryKey="sort"
          singleSelection={true}
          app={Apps.LEARN}
        />
      }
    />
  );
};

export default CategoryListHeader;
