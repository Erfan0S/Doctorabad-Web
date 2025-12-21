import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clinicApi } from "@/api/Api";
import { FavoriteStoreParams } from "@/types/insurance";
import { toast } from "react-toastify";
import { isUserLoggedIn, authorizeClientAction } from "@repo/core/utils/authUtils";

interface UseFavoriteOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  clinicId?: number;
}

export function useFavorite(options?: UseFavoriteOptions) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
      mutationFn: async ({ clinicId, favorite }: { clinicId: number; favorite: number }) => {
      const response = await clinicApi.storeFavorite(clinicId, favorite);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["diseases"] });
      queryClient.invalidateQueries({ queryKey: ["disease-details"] });
      
      if (options?.clinicId) {
        queryClient.invalidateQueries({ 
          queryKey: ["disease-details", options.clinicId] 
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

  const toggleFavorite = (clinicId: number, currentStatus: boolean) => {
    console.log(clinicId, currentStatus)
      mutation.mutate({
        clinicId,
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