// components/Skeletons/MedicineCardSkeleton.tsx
"use client";

import styles from "./MedicineCardSkeleton.module.scss";

export default function MedicineCardSkeleton() {
  return (
    <div className={styles.medicineCard}>
      <div className={styles.medicineImage}>
        <div className={styles.shimmer}></div>
      </div>
      <div className={styles.medicineInfo}>
        <div className={styles.titleEn}>
          <div className={styles.shimmer}></div>
        </div>
        <div className={styles.titleFa}>
          <div className={styles.shimmer}></div>
        </div>
      </div>
    </div>
  );
}