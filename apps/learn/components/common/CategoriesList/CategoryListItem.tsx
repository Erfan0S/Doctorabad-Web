import { CategoryType, ProviderType } from "@/types/homePage";
import React from "react";
import style from "./CategoriesList.module.scss";
import Link from "next/link";
import Image from "next/image";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";

type Props = {
  category: CategoryType | ProviderType;
  isProvider?: boolean;
};

const CategoryListItem = ({ category, isProvider }: Props) => {
  return (
    <Link
      href={
        isProvider
          ? `/providers/${category.id}`
          : `/categories/${category.id}`
      }
      className={style.ListItemWrapper}
    >
      <Image
        className={style.ListItem}
        // style={{ backgroundImage: `url(${category.pic_url})` }}
        src={category.pic_url || placeHolderDataUrl}
        alt={isProvider ? "ارائه‌دهنده" : "دسته بندی"}
        fill
        style={{ objectFit: "cover" }}
        placeholder={placeHolderDataUrl}
      />
      {!isProvider ? (
        <h2 className={style.ListItemTitle}>
          {/* @ts-ignore */}
          {category?.title || category?.name}
        </h2>
      ) : null}
    </Link>
  );
};

export default CategoryListItem;
