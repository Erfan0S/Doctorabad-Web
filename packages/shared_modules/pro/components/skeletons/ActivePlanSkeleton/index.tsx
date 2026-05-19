"use client";

import styles from "./ActivePlanSkeleton.module.scss";

export default function ActivePlanSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.shimmer} />
      </div>
      <div className={styles.badge}>
        <div className={styles.shimmer} />
      </div>
    </div>
  );
}
