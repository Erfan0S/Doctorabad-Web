"use client";
import { useEffect } from "react";
import { FavoriteHeartIcon } from "..";
import { Apps } from "@repo/core/types/general";
import {
  useToggleFavoriteProduct,
  UseToggleFavoriteProductType,
} from "@repo/core/hooks/useToggleFavoriteProduct";
import { useRouter } from "next/navigation";
import style from "./style.module.scss";

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
      className={`${className} ${style.favoriteButton} ${style[app as string]}`}
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
