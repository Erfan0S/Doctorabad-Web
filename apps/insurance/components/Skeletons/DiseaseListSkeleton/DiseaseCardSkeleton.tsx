// components/Skeletons/DiseaseCardSkeleton.tsx
"use client";

import styles from "./DiseaseCardSkeleton.module.scss";

export default function DiseaseCardSkeleton() {
  return (
    <div className={styles.diseaseCard}>
      <div className={styles.diseaseImage}>
        <div className={styles.shimmer}></div>
      </div>
      <div className={styles.diseaseInfo}>
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