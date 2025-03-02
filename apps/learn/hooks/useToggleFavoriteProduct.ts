"use client";
import { api } from "@/api/Api";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export const useToggleFavoriteProduct = (initialState: boolean) => {
  const [isFavorite, setIsFavorite] = useState(initialState);

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => {
      return api[!isFavorite ? "addFavorite" : "removeFavorite"](id);
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
