"use client";
import { useEffect } from "react";
import { FavoriteHeartIcon } from "..";
import { Apps } from "@repo/core/types/general";
import { useToggleFavoriteProduct } from "@repo/core/hooks/useToggleFavoriteProduct";
import { useRouter } from "next/navigation";
import style from "./style.module.scss";

type Props = {
  id: number;
  initialFavoriteState: boolean;
  app: Omit<Apps, "BASE">;
  className?: string;
};

function FavoriteButton({ id, initialFavoriteState, app, className }: Props) {
  const router = useRouter();

  const {
    isFavorite,
    toggleFavorite,
    isLoading: favoriteLoading,
  } = useToggleFavoriteProduct(initialFavoriteState, app);

  const favoriteOnClick = () => {
    toggleFavorite(id);
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
