// components/Skeletons/PharmacySliderSkeleton.tsx
"use client";

import styles from "./PharmacySliderSkeleton.module.scss";

export default function PharmacySliderSkeleton() {
  return (
    <div className={styles.sliderSection}>
      <div className={styles.skeletonSlide}>
        <div className={styles.shimmer}></div>
      </div>
      <div className={styles.pagination}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
}