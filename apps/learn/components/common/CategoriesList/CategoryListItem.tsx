import { CategoryType, ProviderType } from "@/types/homePage";
import React from "react";
import style from "./CategoriesList.module.scss";
import Image from "next/image";
import Link from "next/link";

type Props = {
  category: CategoryType | ProviderType;
  isProvider?: boolean;
};

const CategoryListItem = ({ category, isProvider }: Props) => {
  return (
    <Link
      href={
        isProvider
          ? `/learn/providers/${category.id}`
          : `/learn/categories/${category.id}/${(category as CategoryType).title}`
      }
      className={style.ListItemWrapper}
    >
      <div
        className={style.ListItem}
        style={{ backgroundImage: `url(${category.pic_url})` }}
      >
        {!isProvider ? (
          <h2 className={style.ListItemTitle}>
            {/* @ts-ignore */}
            {category?.title || category?.name}
          </h2>
        ) : null}
      </div>
    </Link>
  );
};

export default CategoryListItem;
