"use client";

import styles from "./ExplanationSkeleton.module.scss";

interface ExplanationSkeletonProps {
  count?: number;
}

export default function ExplanationSkeleton({
  count = 3,
}: ExplanationSkeletonProps) {
  return (
    <div className={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.rightSide}>
            <div className={styles.pic}>
              <div className={styles.shimmer} />
            </div>
            <div className={styles.title}>
              <div className={styles.shimmer} />
            </div>
          </div>
          <div className={styles.description}>
            <div className={styles.shimmer} />
          </div>
        </div>
      ))}
    </div>
  );
}
