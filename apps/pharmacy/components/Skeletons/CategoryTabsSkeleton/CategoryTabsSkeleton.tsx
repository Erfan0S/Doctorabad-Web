"use client";

import styles from "./CategoryTabsSkeleton.module.scss";

interface CategoryTabsSkeletonProps {
  count?: number;
}

export default function CategoryTabsSkeleton({ count = 6 }: CategoryTabsSkeletonProps) {
  return (
    <div className={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.tab}>
          <div className={styles.shimmer} />
        </div>
      ))}
    </div>
  );
}

