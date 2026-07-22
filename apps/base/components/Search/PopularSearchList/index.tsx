"use client";

import { api } from "@/api/Api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
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

  // if (!query) {
  //   return null;
  // }

  if (!Array.isArray(popularData) || popularData.length === 0) {
    return null;
  }

  return (
    <div className="container">
      <div className="my-6">
        <h3 className="mb-3 text-[18px] font-bold text-app-base">جستجوهای پرطرفدار</h3>
        <div className="flex flex-wrap gap-3">
          {popularData.map((item: PopularSearchItem) => (
            <button
              key={item.id}
              type="button"
              className={`flex max-w-full cursor-pointer items-center rounded-full border border-solid border-app-base bg-white px-3.5 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ${item.product_type}`}
              onClick={() => handlePopularSelect(item.title)}
            >
              <span className="block max-w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-[#334155]">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularSearchList;
