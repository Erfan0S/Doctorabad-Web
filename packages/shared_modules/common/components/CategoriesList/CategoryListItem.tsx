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
        baseUrl ? `/${baseUrl}/${category.id}` : `/categories/${category.id}`
      }
      className="relative flex h-[100px] w-[48%] items-center justify-center sm:h-[20vw] sm:max-h-[200px]"
    >
      <Image
        className="rounded-[25px] border-2 border-solid border-white bg-white bg-cover bg-center object-cover shadow-[0px_0_5px_0px_rgba(0,0,0,0.45)]"
        // style={{ backgroundImage: `url(${category.pic_url})` }}
        src={category.pic_url || placeHolderDataUrl}
        alt={category.alt || category.title || "دسته بندی"}
        fill
        style={{ objectFit: category.objectFit || "contain" }}
        placeholder={placeHolderDataUrl}
      />
      {category.title ? (
        <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white [text-shadow:0_0_10px_rgba(0,0,0,0.6)]">
          {category?.title}
        </h2>
      ) : null}
    </Link>
  );
};

export default TileListItem;
