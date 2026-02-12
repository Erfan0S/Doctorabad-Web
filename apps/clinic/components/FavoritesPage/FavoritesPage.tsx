"use client";

import { useMemo, useCallback } from "react";
import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import { clinicApi } from "@/api/Api";
import { DiseaseListResponse } from "@/types/clinic";
import DiseaseList from "@/components/DiseaseList/DiseaseList";
import DiseaseListSkeleton from "@/components/Skeletons/DiseaseListSkeleton/DiseaseListSkeleton";

export default function FavoritesPage() {
  const {
    data: favoritesData,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["favorites"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await clinicApi.getFavoriteList(pageParam);
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.meta;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });


  const favorites = useMemo(() => {
    return favoritesData?.pages.flatMap((page) => page.data) ?? [];
  }, [favoritesData]);

  const loadMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <DiseaseListSkeleton count={8} />;
  }

  if (isError) {
    return (
      <div style={{ textAlign: "center", marginTop: 36 }}>
        خطا در بارگذاری علاقه‌مندی‌ها
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: 40,
          fontSize: 16,
          padding: "16px",
        }}
      >
        ❤️ هنوز بیماری به علاقه‌مندی‌ها اضافه نکرده‌اید
      </div>
    );
  }

  return (
    <div style={{ padding: "16px" }}>
      <DiseaseList
        diseases={favorites}
        loading={isFetchingNextPage}
        hasMore={hasNextPage ?? false}
        onLoadMore={loadMore}
      />
    </div>
  );
}
