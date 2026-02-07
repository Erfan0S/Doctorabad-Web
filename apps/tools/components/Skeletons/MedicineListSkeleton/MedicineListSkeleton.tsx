// components/Skeletons/MedicineListSkeleton.tsx
"use client";

import MedicineCardSkeleton from "./MedicineCardSkeleton";
import styles from "./MedicineListSkeleton.module.scss";

interface MedicineListSkeletonProps {
  count?: number;
}

export default function MedicineListSkeleton({ count = 6 }: MedicineListSkeletonProps) {
  return (
    <div className={styles.medicinesList}>
      {Array.from({ length: count }).map((_, index) => (
        <MedicineCardSkeleton key={index} />
      ))}
    </div>
  );
}