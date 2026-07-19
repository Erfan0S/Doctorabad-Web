"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

interface ClinicSearchSectionProps {
  searchQuery: string; 
  onSearchChange: (query: string) => void;
  onSearchDebounced: (query: string) => void;
}

export default function ClinicSearchSection({
  searchQuery,
  onSearchChange,
  onSearchDebounced,
}: ClinicSearchSectionProps) {
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
    // ponytail: old scss had `align-items: space-between` which is invalid CSS
    // (browsers ignored it), so no align class is emitted here.
    <div className="sticky top-14 z-[100] flex gap-[15px] bg-white px-4 py-2.5">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="هرچه می‌خواهد دل تنگت بجوی!"
          className="h-10 w-full rounded-xl border border-solid border-green-base bg-white ps-[5px] text-sm [direction:rtl] placeholder:text-[#999] disabled:cursor-not-allowed disabled:bg-white"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <svg
          className="absolute end-[5px] top-1/2 -translate-y-1/2 text-[#999]"
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
