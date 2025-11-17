"use client";

import styles from "./MedicineDetailsSkeleton.module.scss";

export default function MedicineDetailsSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.image}>
          <div className={styles.shimmer} />
        </div>
        <div className={styles.titles}>
          <div className={styles.titleLine}>
            <div className={styles.shimmer} />
          </div>
          <div className={styles.titleLine}>
            <div className={styles.shimmer} />
          </div>
        </div>
      </div>

      <div className={styles.sections}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.shimmer} />
            </div>
            <div className={styles.sectionBody}>
              <div className={styles.shimmer} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

