"use client";

import { api } from "@/api/Api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./popularSearchList.module.scss";
import { PopularSearchItem } from "@/types/globalSerach";

const PopularSearchList = () => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = params?.get("q") || "";

  const { data: popularData } = useQuery({
    queryKey: ["popularSearch"],
    queryFn: async () => {
      const response = await api.getPopularSearch();
      return (response as any)?.data?.data ?? response?.data ?? [];
    },
    retry: false,
  });

  const handlePopularSelect = useCallback(
    (value: string) => {
      const trimmedValue = value.trim();

      if (!trimmedValue) return;

      const nextParams = new URLSearchParams(params?.toString() ?? "");
      nextParams.set("q", trimmedValue);
      router.push(`${pathname}?${nextParams.toString()}`);
    },
    [params, pathname, router],
  );

  if (!query) {
    return null;
  }

  if (!Array.isArray(popularData) || popularData.length === 0) {
    return null;
  }

  return (
    <div className="container">
      <div className={styles.popularListWrapper}>
        <h3 className={styles.popularTitle}>جستجوهای پرطرفدار</h3>
        <div className={styles.popularList}>
          {popularData.map((item: PopularSearchItem) => (
            <button
              key={item.id}
              type="button"
              className= {`${styles.popularCard} ${item.product_type}`}
              onClick={() => handlePopularSelect(item.title)}
            >
              <span className={styles.popularText}>{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularSearchList;
