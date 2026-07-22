"use client";

import { api } from "@/api/Api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

const SearchHistoryList = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = params?.get("q") || "";

  const { data: historyData, refetch: refetchHistory } = useQuery({
    queryKey: ["searchHistory"],
    queryFn: async () => {
      const response = await api.getSearchHistory();
      return (response as any)?.data?.data ?? response?.data ?? [];
    },
    retry: false,
  });

  const handleHistoryDelete = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
      event.stopPropagation();

      try {
        await api.deleteSearchHistory(id);
        await refetchHistory();
      } catch (error) {
        console.error(error);
      }
    },
    [refetchHistory],
  );

  const handleHistorySelect = useCallback(
    (value: string) => {
      const trimmedValue = value.trim();

      if (!trimmedValue) return;

      const nextParams = new URLSearchParams(params?.toString() ?? "");
      nextParams.set("q", trimmedValue);
      router.push(`${pathname}?${nextParams.toString()}`);
    },
    [params, pathname, router],
  );

  // if (!query) {
  //   return null;
  // }

  if (!Array.isArray(historyData) || historyData.length === 0) {
    return null;
  }

  return (
    <div className="container">
      <div className="mb-6">
        <h3 className="mb-3 text-[18px] font-bold text-app-base">تاریخچه جستجو</h3>
        <div className="flex flex-wrap gap-3">
          {historyData.map((item: { id: number; search: string }) => (
            <div
              key={item.id}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-solid border-[#e2e8f0] bg-white px-3.5 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              onClick={() => handleHistorySelect(item.search)}
            >
              <span className="text-sm text-[#334155]">{item.search}</span>
              <button
                type="button"
                className="cursor-pointer border-0 bg-transparent p-0 text-[18px] leading-none text-[#64748b] hover:text-[#ef4444]"
                onClick={(event) => handleHistoryDelete(event, item.id)}
                aria-label={`حذف ${item.search}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryList;
