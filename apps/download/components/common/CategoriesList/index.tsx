import { CollectionType, ProviderType } from "@/types/homePage";
import React from "react";
import CategoryListItem from "./CategoryListItem";
import style from "./CategoriesList.module.scss";

type Props = {
  categories: CollectionType[] | ProviderType[];
  isProvider?: boolean;
};

const CategoriesList = ({ categories, isProvider }: Props) => {
  return (
    <div className={style.ListWrapper}>
      {categories.map((category, i) => (
        <CategoryListItem
          key={`${category.id}-${i}`}
          category={category}
          isProvider={isProvider}
        />
      ))}
    </div>
  );
};

export default CategoriesList;
