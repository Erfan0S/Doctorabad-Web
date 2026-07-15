// components/Skeletons/DiseaseListSkeleton.tsx
"use client";

import DiseaseCardSkeleton from "./DiseaseCardSkeleton";

interface DiseaseListSkeletonProps {
  count?: number;
}

export default function DiseaseListSkeleton({ count = 6 }: DiseaseListSkeletonProps) {
  return (
    <div className="flex flex-col gap-3 p-4">
      {Array.from({ length: count }).map((_, index) => (
        <DiseaseCardSkeleton key={index} />
      ))}
    </div>
  );
}