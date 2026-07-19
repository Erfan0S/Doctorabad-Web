"use client";

import DiseaseCardSkeleton from "./DiseaseCardSkeleton";

interface DiseaseListSkeletonProps {
  count?: number;
}

export default function DiseaseListSkeleton({
  count = 6,
}: DiseaseListSkeletonProps) {
  return (
    <div className="clinic-disease-list">
      {Array.from({ length: count }).map((_, index) => (
        <DiseaseCardSkeleton key={index} />
      ))}
    </div>
  );
}
