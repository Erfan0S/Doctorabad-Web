import React from "react";
import PageHeader from "../PageHeader";
import Accordion from "@/components/accordion";
import styles from "./CategoryListHeader.module.scss";
import { SortType } from "@/types/filters";

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
      children={
        <Accordion
          title="نمایش براساس..."
          className={styles.filter}
          items={filterData}
          queryKey="sort"
          singleSelection={true}
        />
      }
    />
  );
};

export default CategoryListHeader;
