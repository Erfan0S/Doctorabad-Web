// components/PharmacyHeader/PharmacyHeader.tsx
"use client";

import { useRouter } from "next/navigation";
import styles from "./PharmacyHeader.module.scss";
import BackArrow from "@/assets/svg/backArrow";
import Heart from "@/assets/svg/heart";

interface PharmacyHeaderProps {
  onCategoriesClick: () => void;
}

export default function PharmacyHeader({
  onCategoriesClick,
}: PharmacyHeaderProps) {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1 className={styles.title}>داروخانه‌من</h1>
        <div className={styles.lefSideHeader}>
          <button
            className={styles.favoriteBtn}
            onClick={() => router.push("/favorites")}
          >
            <Heart size={32} strokeWidth={2} />
          </button>
          <button className={styles.backBtn} onClick={() => router.back()}>
            <BackArrow strokeWidth={2}></BackArrow>
          </button>
        </div>
      </div>

      <div className={styles.searchSection}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="هرچیزی، خواهدل، نشکیب‌جو، رل!"
            className={styles.searchInput}
            disabled
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
    </header>
  );
}
