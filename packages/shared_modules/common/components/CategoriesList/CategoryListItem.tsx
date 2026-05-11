import style from "./CategoriesList.module.scss";
import Link from "next/link";
import Image from "next/image";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";

export type CategoryType = {
  id: number | string;
  title?: string;
  pic_url?: string;
  alt?: string;
  objectFit?: "contain" | "fill" | "cover";
};

type Props = {
  category: CategoryType;
  baseUrl?: string;
};

const TileListItem = ({ category, baseUrl }: Props) => {
  return (
    <Link
      href={
        baseUrl
          ? `/${baseUrl}/${category.id}`
          : `/categories/${category.id}/${(category as CategoryType).title}`
      }
      className={style.ListItemWrapper}
    >
      <Image
        className={style.ListItem}
        // style={{ backgroundImage: `url(${category.pic_url})` }}
        src={category.pic_url || placeHolderDataUrl}
        alt={category.alt || category.title || "دسته بندی"}
        fill
        style={{ objectFit: category.objectFit || "contain" }}
        placeholder={placeHolderDataUrl}
      />
      {category.title ? (
        <h2 className={style.ListItemTitle}>{category?.title}</h2>
      ) : null}
    </Link>
  );
};

export default TileListItem;
