// components/PharmacySearchSection/PharmacySearchSection.tsx
"use client";

import { useState, useEffect } from "react";
import styles from "./PharmacySearchSection.module.scss";

interface PharmacySearchSectionProps {
  onCategoriesClick: () => void;
  onSearch: (query: string) => void;
}

export default function PharmacySearchSection({
  onCategoriesClick,
  onSearch
}: PharmacySearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
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
          <circle
            cx="11"
            cy="11"
            r="8"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M21 21L16.65 16.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <button className={styles.categoriesBtn} onClick={onCategoriesClick}>
        دسته‌بندی
      </button>
    </div>
  );
}