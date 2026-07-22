"use client";

import { api } from "@/api/Api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./searchHistoryList.module.scss";

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
      <div className={styles.historyListWrapper}>
        <h3 className={styles.historyTitle}>تاریخچه جستجو</h3>
        <div className={styles.historyList}>
          {historyData.map((item: { id: number; search: string }) => (
            <div
              key={item.id}
              className={styles.historyCard}
              onClick={() => handleHistorySelect(item.search)}
            >
              <span className={styles.historyText}>{item.search}</span>
              <button
                type="button"
                className={styles.historyRemove}
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
