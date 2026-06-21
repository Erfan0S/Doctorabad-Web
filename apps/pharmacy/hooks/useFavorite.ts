import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pharmacyApi } from "@/api/Api";
import { FavoriteStoreParams } from "@/types/pharmacy";
import { toast } from "react-toastify";
import {
  isUserLoggedIn,
  authorizeClientAction,
} from "@repo/core/utils/authUtils";

interface UseFavoriteOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  medicineId?: number;
}

export function useFavorite(options?: UseFavoriteOptions) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      medicineId,
      favorite,
    }: {
      medicineId: number;
      favorite: number;
    }) => {
      const response = await pharmacyApi.storeFavorite(medicineId, favorite);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
      queryClient.invalidateQueries({ queryKey: ["medicine-details"] });

      if (options?.medicineId) {
        queryClient.invalidateQueries({
          queryKey: ["medicine-details", options.medicineId],
        });
      }

      if (variables.favorite === 1) {
        toast.success("به علاقه‌مندی‌ها اضافه شد");
      } else {
        toast.success("از علاقه‌مندی‌ها حذف شد");
      }

      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      console.error("Error toggling favorite:", error);
      toast.error("خطا در عملیات");
      options?.onError?.(error);
    },
  });

  const toggleFavorite = (medicineId: number, currentStatus: boolean) => {
    mutation.mutate({
      medicineId,
      favorite: currentStatus ? 0 : 1,
    });
  };

  return {
    toggleFavorite,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}
