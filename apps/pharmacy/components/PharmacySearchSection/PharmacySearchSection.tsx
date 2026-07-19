"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

const searchInputCls =
  "h-10 w-full rounded-xl border border-solid border-green-base bg-white ps-[5px] text-sm [direction:rtl] placeholder:text-[#999] disabled:cursor-not-allowed disabled:bg-white";

interface PharmacySearchSectionProps {
  onSearchChange: (query: string) => void;
  onSearchDebounced: (query: string) => void;
  searchQuery: string; 
}

export default function PharmacySearchSection({
  searchQuery,
  onSearchChange,
  onSearchDebounced,
}: PharmacySearchSectionProps) {
  const router = useRouter();
  
  const trimmedQuery = useMemo(() => searchQuery.trim(), [searchQuery]);

  useEffect(() => {
    if (!trimmedQuery) {
      onSearchDebounced("");
      return;
    }

    const timeoutId = setTimeout(() => {
      onSearchDebounced(trimmedQuery);
    }, 2000); 

    return () => clearTimeout(timeoutId);
  }, [trimmedQuery, onSearchDebounced]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleCategoriesClick = () => {
    router.push("/categories");
  };

  return (
    <div className="sticky top-[3.5rem] z-[100] flex gap-[15px] bg-white px-[16px] py-[10px]">
      <div className="relative flex-1 w-full">
        <input
          type="text"
          placeholder="هرچه می‌خواهد دل تنگت بجوی!"
          className={searchInputCls}
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <svg
          className="absolute left-[5px] top-1/2 -translate-y-1/2 text-[#999]"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
          <path
            d="M21 21L16.65 16.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <button
        className="h-10 cursor-pointer whitespace-nowrap rounded-xl border-none bg-green-base px-5 text-sm font-semibold text-white transition-all duration-200 active:scale-95"
        onClick={handleCategoriesClick}
      >
        دسته‌بندی
      </button>
    </div>
  );
}
