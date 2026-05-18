// components/Skeletons/DiseaseListSkeleton.tsx
"use client";

import DiseaseCardSkeleton from "./DiseaseCardSkeleton";
import styles from "./DiseaseListSkeleton.module.scss";

interface DiseaseListSkeletonProps {
  count?: number;
}

export default function DiseaseListSkeleton({ count = 6 }: DiseaseListSkeletonProps) {
  return (
    <div className={styles.diseasesList}>
      {Array.from({ length: count }).map((_, index) => (
        <DiseaseCardSkeleton key={index} />
      ))}
    </div>
  );
}