"use client";

import styles from "./PlansSkeleton.module.scss";

interface PlansSkeletonProps {
  count?: number;
}

export default function PlansSkeleton({ count = 3 }: PlansSkeletonProps) {
  return (
    <div className={styles.plansList}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.planItem}>
          <div className={styles.radio}>
            <div className={styles.shimmer} />
          </div>
          <div className={styles.title}>
            <div className={styles.shimmer} />
          </div>
          <div className={styles.prices}>
            <div className={styles.priceRow}>
              <div className={styles.shimmer} />
            </div>
            <div className={styles.offPrice}>
              <div className={styles.shimmer} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
