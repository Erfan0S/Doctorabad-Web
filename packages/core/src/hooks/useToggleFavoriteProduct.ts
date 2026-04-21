"use client";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

export interface UseToggleFavoriteProductType {
  initialState: boolean;
  action: (isFavorite: boolean) => Promise<any>;
  productTypeName?: string;
}

export const useToggleFavoriteProduct = ({
  initialState,
  action,
  productTypeName,
}: UseToggleFavoriteProductType) => {
  const [isFavorite, setIsFavorite] = useState(initialState);

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return action(isFavorite);
    },
    onSuccess() {
      const newFavoriteState = !isFavorite;
      setIsFavorite(newFavoriteState);

      toast(
        newFavoriteState
          ? `${productTypeName || "محصول"} به علاقهمندیها اضافه شد`
          : `${productTypeName || "محصول"} از علاقهمندیها حذف شد`,
        { type: "success", position: "top-left" },
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
