// components/Skeletons/MedicineListSkeleton.tsx
"use client";

import MedicineCardSkeleton from "./MedicineCardSkeleton";

interface MedicineListSkeletonProps {
  count?: number;
}

export default function MedicineListSkeleton({ count = 6 }: MedicineListSkeletonProps) {
  return (
    <div className="flex flex-col gap-3 p-4">
      {Array.from({ length: count }).map((_, index) => (
        <MedicineCardSkeleton key={index} />
      ))}
    </div>
  );
}