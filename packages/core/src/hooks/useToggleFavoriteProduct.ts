"use client";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { api } from "@repo/shared_modules/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { Apps } from "../types/general";

export const useToggleFavoriteProduct = (
  initialState: boolean,
  app: Omit<Apps, "EXAM" | "BASE">
) => {
  const [isFavorite, setIsFavorite] = useState(initialState);

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => {
      switch (app) {
        case Apps.LEARN:
          return api[!isFavorite ? "addLearnFavorite" : "removeLearnFavorite"](
            id
          );
          break;
        case Apps.MARKET:
          return api[
            !isFavorite ? "addMarketFavorite" : "removeMarketFavorite"
          ](id);
          break;
        default:
          return api[!isFavorite ? "addLearnFavorite" : "removeLearnFavorite"](
            id
          );
          break;
      }
    },
    onSuccess() {
      const newFavoriteState = !isFavorite;
      setIsFavorite(newFavoriteState);

      toast(
        newFavoriteState
          ? "دوره به علاقه‌مندی‌ها اضافه شد"
          : "دوره از علاقه‌مندی‌ها حذف شد",
        { type: "success", position: "top-left" }
      );
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });

  return {
    isFavorite,
    toggleFavorite: authorizeClientAction(mutate),
    isLoading: isPending,
  };
};
