"use client";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../api/Api";

export const useToggleFavoriteQuestion = (initialState: boolean) => {
  const [isFavorite, setIsFavorite] = useState(initialState);

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) => {
      return api.addQuestionFavorite(id, Number(!isFavorite));
    },
    onSuccess() {
      const newFavoriteState = !isFavorite;
      setIsFavorite(newFavoriteState);

      toast(
        newFavoriteState
          ? "سوال به علاقه‌مندی‌ها اضافه شد"
          : "سوال از علاقه‌مندی‌ها حذف شد",
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
