"use client";

import styles from "./CategoriesSkeleton.module.scss";

interface CategoriesSkeletonProps {
  items?: number;
  nested?: boolean;
}

export default function CategoriesSkeleton({
  items = 4,
  nested = false,
}: CategoriesSkeletonProps) {
  return (
    <div
      className={`${nested ? styles.nestedContainer : styles.container}`.trim()}
    >
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.shimmer} />
        </div>
      ))}
    </div>
  );
}

