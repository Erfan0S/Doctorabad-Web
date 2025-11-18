"use client";

import { useMemo, useCallback } from "react";
import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import { pharmacyApi } from "@/api/Api";
import { MedicineListResponse } from "@/types/pharmacy";
import MedicineList from "@/components/MedicineList/MedicineList";
import MedicineListSkeleton from "@/components/Skeletons/MedicineListSkeleton/MedicineListSkeleton";

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
    queryFn: async ({
      pageParam = 1,
    }: QueryFunctionContext<readonly unknown[], number>) => {
      const url = `/user/v1/medicine/favorite/list?page=${pageParam}`;
      const response = await pharmacyApi.request.get<{
        data: MedicineListResponse;
      }>(url);
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
    return <MedicineListSkeleton count={8} />;
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
        ❤️ هنوز دارویی به علاقه‌مندی‌ها اضافه نکرده‌اید
      </div>
    );
  }

  return (
    <div style={{ padding: "16px" }}>
      <MedicineList
        medicines={favorites}
        loading={isFetchingNextPage}
        hasMore={hasNextPage ?? false}
        onLoadMore={loadMore}
      />
    </div>
  );
}
