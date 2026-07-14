import { CollectionType, ProviderType } from "@/types/homePage";
import React from "react";
import CategoryListItem from "./CategoryListItem";

type Props = {
  categories: CollectionType[] | ProviderType[];
  isProvider?: boolean;
};

const CategoriesList = ({ categories, isProvider }: Props) => {
  return (
    <div className="mx-auto flex w-full flex-wrap justify-center gap-x-2 gap-y-3 px-2.5 pt-2">
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
