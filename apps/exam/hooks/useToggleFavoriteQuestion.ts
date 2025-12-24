"use client";
import { api } from "@/api/Api";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

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
          ? "سوال به نشانه شده‌ها اضافه شد"
          : "سوال از نشانه شده‌ها حذف شد",
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
