import { CategoryType, ProviderType } from "@/types/homePage";
import React from "react";
import CategoryListItem from "./CategoryListItem";
import style from "./CategoriesList.module.scss";

type Props = {
  categories: CategoryType[] | ProviderType[];
  isProvider?: boolean;
};

const CategoriesList = ({ categories, isProvider }: Props) => {
  return (
    <div className={style.ListWrapper}>
      {categories.map((category) => (
        <CategoryListItem
          key={category.id}
          category={category}
          isProvider={isProvider}
        />
      ))}
    </div>
  );
};

export default CategoriesList;
