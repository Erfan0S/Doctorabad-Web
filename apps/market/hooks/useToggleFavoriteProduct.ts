import { api } from "@/api/Api";
import { authorizeClientAction } from "@repo/core/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export const useToggleFavoriteProduct = (initialState: boolean) => {
  const [isFavorite, setIsFavorite] = useState(initialState);

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => {
      const toggle = api[!isFavorite ? "addToFavorite" : "removeFromFavorite"];

      return toggle(id);
    },
    onSuccess() {
      const newFavoriteState = !isFavorite;
      setIsFavorite(newFavoriteState);

      toast(
        newFavoriteState
          ? "محصول به علاقه‌مندی‌ها اضافه شد"
          : "محصول از علاقه‌مندی‌ها حذف شد",
        { type: "success", position: "top-left" }
      );
    },
  });

  return {
    isFavorite,
    toggleFavorite: authorizeClientAction(mutate),
    isLoading: isPending,
  };
};
