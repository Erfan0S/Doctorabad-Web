"use client";

import { useCallback, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { clinicApi } from "@/api/Api";
import { DiseaseListParams } from "@/types/clinic";
import DiseaseList from "./DiseaseList";
import DiseaseListSkeleton from "@/components/Skeletons/DiseaseListSkeleton/DiseaseListSkeleton";

interface DiseaseListSectionProps {
  selectedCategory: number | null;
  searchQuery: string;
  debouncedSearchQuery: string;
}

export default function DiseaseListSection({
  selectedCategory,
  searchQuery,
  debouncedSearchQuery,
}: DiseaseListSectionProps) {
  const isSearchMode = searchQuery.trim().length > 0;

  const {
    data: diseasesData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["diseases", selectedCategory, debouncedSearchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const params: DiseaseListParams = { page: pageParam };

      if (debouncedSearchQuery.trim()) {
        params.title = debouncedSearchQuery.trim();
      } else if (selectedCategory) {
        params.category_id = selectedCategory;
      }

      const response = await clinicApi.getDiseaseList(params);
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

  const diseases = useMemo(() => {
    return diseasesData?.pages.flatMap((page) => page.data) ?? [];
  }, [diseasesData]);

  const initialLoading = isLoading && !diseasesData;
  const isDebouncing = isSearchMode && searchQuery !== debouncedSearchQuery;

  const loadMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  if (initialLoading || isDebouncing) {
    return <DiseaseListSkeleton count={8} />;
  }

  return (
    <DiseaseList
      diseases={diseases}
      loading={isFetchingNextPage}
      hasMore={hasNextPage ?? false}
      onLoadMore={loadMore}
    />
  );
}

