import { useMutation } from "@tanstack/react-query";
import { pharmacyApi } from "@/api/Api";
import { markAsViewedToday } from "@/utils/medicineViewTracking";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";

interface UseMedicineViewOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Hook to track medicine views using React Query mutation
 * Automatically marks the medicine as viewed in localStorage on success
 */
export function useMedicineView(options?: UseMedicineViewOptions) {
  const mutation = useMutation({
    mutationFn: async (medicineId: number) => {
      const response = await pharmacyApi.recordMedicineView(medicineId);
      return response.data;
    },
    onSuccess: (data, medicineId) => {
      // Mark as viewed in localStorage on successful API call
      markAsViewedToday(medicineId);
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      // Silently fail - don't interrupt user experience
      console.error("Failed to record medicine view:", error);
      options?.onError?.(error);
    },
  });

  const recordMedicineView = (medicineId: number) => {
    // Only call if user is logged in
    if (isUserLoggedIn()) {
      mutation.mutate(medicineId);
    }
  };

  return {
    recordMedicineView,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}

