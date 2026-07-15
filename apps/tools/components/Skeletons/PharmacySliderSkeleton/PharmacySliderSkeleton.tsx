// components/Skeletons/PharmacySliderSkeleton.tsx
"use client";

export default function PharmacySliderSkeleton() {
  return (
    <div className="relative bg-white p-4 pb-6">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#e0e0e0]">
        <div className="skeleton-shimmer"></div>
      </div>
      <div className="mt-2 flex justify-center gap-2">
        <span className="h-2 w-6 rounded bg-[#e0e0e0]"></span>
        <span className="h-2 w-2 rounded-full bg-[#e0e0e0]"></span>
        <span className="h-2 w-2 rounded-full bg-[#e0e0e0]"></span>
      </div>
    </div>
  );
}
