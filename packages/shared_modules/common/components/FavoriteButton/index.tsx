"use client";
import { useEffect } from "react";
import { FavoriteHeartIcon } from "..";
import { Apps } from "@repo/core/types/general";
import {
  useToggleFavoriteProduct,
  UseToggleFavoriteProductType,
} from "@repo/core/hooks/useToggleFavoriteProduct";
import { useRouter } from "next/navigation";

interface Props extends UseToggleFavoriteProductType {
  app: Apps;
  className?: string;
}

function FavoriteButton({ app, className, ...rest }: Props) {
  const router = useRouter();

  const {
    isFavorite,
    toggleFavorite,
    isLoading: favoriteLoading,
  } = useToggleFavoriteProduct(rest);

  const favoriteOnClick = () => {
    toggleFavorite();
  };

  useEffect(() => {
    router.refresh();
  }, [isFavorite]);

  return (
    <button
      onClick={favoriteOnClick}
      className={`${className} me-[8px] flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-[12px] border border-solid border-[#ccc] bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)] outline-none first-of-type:me-0 focus:outline-none active:outline-none [&_img]:h-[25px] [&_img]:w-[25px] [&_svg]:h-[25px] [&_svg]:w-[25px] ${app as string}`}
    >
      <FavoriteHeartIcon
        loading={favoriteLoading}
        isFavorite={isFavorite}
        app={app as Apps}
      />
    </button>
  );
}

export default FavoriteButton;
