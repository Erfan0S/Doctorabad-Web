import { useMutation } from "@tanstack/react-query";
import { clinicApi } from "@/api/Api";
import { markAsViewedToday } from "@/utils/diseaseViewTracking";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";

interface UseDiseaseViewOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Hook to track disease views using React Query mutation
 * Automatically marks the disease as viewed in localStorage on success
 */
export function useDiseaseView(options?: UseDiseaseViewOptions) {
  const mutation = useMutation({
    mutationFn: async (diseaseId: number) => {
      const response = await clinicApi.recordDiseaseView(diseaseId);
      return response.data;
    },
    onSuccess: (data, diseaseId) => {
      // Mark as viewed in localStorage on successful API call
      markAsViewedToday(diseaseId);
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      // Silently fail - don't interrupt user experience
      console.error("Failed to record disease view:", error);
      options?.onError?.(error);
    },
  });

  const recordDiseaseView = (diseaseId: number) => {
    // Only call if user is logged in
    if (isUserLoggedIn()) {
      mutation.mutate(diseaseId);
    }
  };

  return {
    recordDiseaseView,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}

