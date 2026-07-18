// components/Skeletons/PharmacySliderSkeleton.tsx
"use client";

// repeated within this file only → module-level const (rule 2)
const dot = "h-2 w-2 rounded-full bg-[#e0e0e0] first:w-6 first:rounded";

export default function PharmacySliderSkeleton() {
  return (
    <div className="relative bg-white p-4 pb-6">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#e0e0e0]">
        <div className="skeleton-shimmer"></div>
      </div>
      <div className="mt-2 flex justify-center gap-2">
        <span className={dot}></span>
        <span className={dot}></span>
        <span className={dot}></span>
      </div>
    </div>
  );
}