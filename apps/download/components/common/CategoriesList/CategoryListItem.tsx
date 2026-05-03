import { CollectionType, ProviderType } from "@/types/homePage";
import React from "react";
import style from "./CategoriesList.module.scss";
import Link from "next/link";
import Image from "next/image";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";

type Props = {
  category: CollectionType | ProviderType;
  isProvider?: boolean;
};

const CategoryListItem = ({ category, isProvider }: Props) => {
  return (
    <Link
      href={
        isProvider
          ? `/providers/${category.id}`
          : `/categories/${category.id}/${(category as CollectionType).title}`
      }
      className={style.ListItemWrapper}
    >
      <Image
        className={style.ListItem}
        // style={{ backgroundImage: `url(${category.pic_url})` }}
        src={category.picture || placeHolderDataUrl}
        alt={isProvider ? "ارائه‌دهنده" : "دسته بندی"}
        fill
        style={{ objectFit: "contain" }}
        placeholder={placeHolderDataUrl}
      />

    </Link>
  );
};

export default CategoryListItem;
