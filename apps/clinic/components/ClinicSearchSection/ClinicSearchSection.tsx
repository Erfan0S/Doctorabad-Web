"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "./ClinicSearchSection.module.scss";

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
    <div className={styles.searchSection}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="هرچه می‌خواهد دل تنگت بجوی!"
          className={styles.searchInput}
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <svg
          className={styles.searchIcon}
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

      <button className={styles.categoriesBtn} onClick={handleCategoriesClick}>
        دسته‌بندی
      </button>
    </div>
  );
}
