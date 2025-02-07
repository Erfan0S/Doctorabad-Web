import { CategoryType, ProviderType } from "@/types/homePage";
import React from "react";
import style from "./CategoriesList.module.scss";
import Image from "next/image";

type Props = {
  category: CategoryType | ProviderType;
  isProvider?: boolean;
};

const CategoryListItem = ({ category, isProvider }: Props) => {
  return (
    <div className={style.ListItem}>
      {!isProvider ? (
        <h2 className={style.ListItemTitle}>
          {/* @ts-ignore */}
          {category?.title || category?.name}
        </h2>
      ) : null}
      {/* <Image alt="category" src={category.pic_url} /> */}
    </div>
  );
};

export default CategoryListItem;
