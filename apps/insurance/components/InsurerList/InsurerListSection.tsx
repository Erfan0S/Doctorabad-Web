// components/InsurerListSection/InsurerListSection.tsx
"use client";

import { useCallback, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { insuranceApi } from "@/api/Api";
import { InsuranceListParams, Insurer } from "@/types/insurance";
import InsurerList from "./InsurerList";
import InsurerListSkeleton from "@/components/Skeletons/DiseaseListSkeleton/DiseaseListSkeleton";

interface InsurerListSectionProps {
  selectedFieldIds: number[];          // از SelectInfo
  selectedGradeIds: number[];          // اختیاری
  residencyStatusId: number | null;    // 1 یا 2
  damageHistoryId: number | null;
  lastInsuranceId: number | null;      // اگر لازم شد
  currentInsuranceEndDate: string | null; // تاریخ ISO یا null
}

export default function InsurerListSection({
  selectedFieldIds,
  selectedGradeIds,
  residencyStatusId,
  damageHistoryId,
  lastInsuranceId,
  currentInsuranceEndDate,
}: InsurerListSectionProps) {
  const {
    data: insurersData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "insurances",
      selectedFieldIds,
      selectedGradeIds,
      residencyStatusId,
      damageHistoryId,
      lastInsuranceId,
      currentInsuranceEndDate,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const params: InsuranceListParams = {
        page: pageParam,
        fields: selectedFieldIds,
        grades: selectedGradeIds.length ? selectedGradeIds : undefined,
        residency_status: residencyStatusId ?? undefined,
        damage_history: damageHistoryId ?? undefined,
        last_insurance: lastInsuranceId ?? undefined,
        current_insurance_end_date: currentInsuranceEndDate,
      };

      const response = await insuranceApi.getInsurances(params);
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

  const insurers: Insurer[] =
    insurersData?.pages.flatMap((page) => page.data) ?? [];

  const initialLoading = isLoading && !insurersData;

  const loadMore = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  if (initialLoading) {
    return <InsurerListSkeleton count={8} />;
  }

  return (
    <InsurerList
      insurers={insurers}
      loading={isFetchingNextPage}
      hasMore={hasNextPage ?? false}
      onLoadMore={loadMore}
      filterParams={{
        fields: selectedFieldIds,
        grades: selectedGradeIds,
        residency: residencyStatusId,
        damageHistory: damageHistoryId,
        lastInsurance: lastInsuranceId,
        endDate: currentInsuranceEndDate,
      }}
    />
  );
}
