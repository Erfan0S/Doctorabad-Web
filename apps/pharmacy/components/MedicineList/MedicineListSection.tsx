"use client";

import { useCallback, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { pharmacyApi } from "@/api/Api";
import { MedicineListParams } from "@/types/pharmacy";
import MedicineList from "./MedicineList";
import MedicineListSkeleton from "@/components/Skeletons/MedicineListSkeleton/MedicineListSkeleton";

interface MedicineListSectionProps {
  selectedCategory: number | null;
  searchQuery: string;
  debouncedSearchQuery: string;
}

export default function MedicineListSection({
  selectedCategory,
  searchQuery,
  debouncedSearchQuery,
}: MedicineListSectionProps) {
  const isSearchMode = searchQuery.trim().length > 0;

  const {
    data: medicinesData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["medicines", selectedCategory, debouncedSearchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const params: MedicineListParams = { page: pageParam };

      if (debouncedSearchQuery.trim()) {
        params.title = debouncedSearchQuery.trim();
      } else if (selectedCategory) {
        params.category_id = selectedCategory;
      }

      const response = await pharmacyApi.getMedicineList(params);
      return {
        data: response.data.data,
        meta: response.data.meta,
      };
    },
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.meta;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 2 * 60 * 1000,
  });

  const medicines = useMemo(() => {
    return medicinesData?.pages.flatMap((page) => page.data) ?? [];
  }, [medicinesData]);

  const initialLoading = isLoading && !medicinesData;
  const isDebouncing = isSearchMode && searchQuery !== debouncedSearchQuery;

  const loadMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  if (initialLoading || isDebouncing) {
    return <MedicineListSkeleton count={8} />;
  }

  return (
    <MedicineList
      medicines={medicines}
      loading={isFetchingNextPage}
      hasMore={hasNextPage ?? false}
      onLoadMore={loadMore}
    />
  );
}

