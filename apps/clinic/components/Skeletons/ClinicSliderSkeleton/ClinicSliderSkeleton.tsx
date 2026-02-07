// components/Skeletons/ClinicSliderSkeleton.tsx
"use client";

import styles from "./ClinicSliderSkeleton.module.scss";

export default function ClinicSliderSkeleton() {
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