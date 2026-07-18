// components/Skeletons/MedicineCardSkeleton.tsx
"use client";

// repeated within this file only → module-level const (rule 2)
const titleLine = "relative h-5 overflow-hidden rounded bg-[#e0e0e0]";

export default function MedicineCardSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-solid border-[#e0e0e0] bg-white p-[10px]">
      <div className="relative h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-xl bg-[#e0e0e0]">
        <div className="skeleton-shimmer"></div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className={`${titleLine} w-[70%]`}>
          <div className="skeleton-shimmer"></div>
        </div>
        <div className={`${titleLine} w-[85%]`}>
          <div className="skeleton-shimmer"></div>
        </div>
      </div>
    </div>
  );
}