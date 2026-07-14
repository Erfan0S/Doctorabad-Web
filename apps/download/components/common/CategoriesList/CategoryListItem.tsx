import { CollectionType, ProviderType } from "@/types/homePage";
import React from "react";
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
          ? `/publishers/${category.id}`
          : `/collections/${category.id}/${(category as CollectionType).title}`
      }
      className="relative flex h-[100px] w-[48%] items-center justify-center sm:h-[20vw] sm:max-h-[200px]"
    >
      <Image
        className="rounded-[25px] border-2 border-solid border-white bg-white bg-cover bg-center object-cover shadow-[0_0_5px_0_rgba(0,0,0,0.45)]"
        // style={{ backgroundImage: `url(${category.pic_url})` }}
        src={category.picture || placeHolderDataUrl}
        alt={isProvider ? "ارائه‌دهنده" : "دسته بندی"}
        fill
        style={isProvider ? { objectFit: "contain" } : { objectFit: "cover" }}
        placeholder={placeHolderDataUrl}
      />

    </Link>
  );
};

export default CategoryListItem;
