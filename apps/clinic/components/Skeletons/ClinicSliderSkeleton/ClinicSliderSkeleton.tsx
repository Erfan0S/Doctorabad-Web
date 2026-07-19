// components/Skeletons/ClinicSliderSkeleton.tsx
"use client";

export default function ClinicSliderSkeleton() {
  return (
    <div className="clinic-slider-section relative">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#e0e0e0]">
        <div className="skeleton-shimmer" />
      </div>
      <div className="mt-2 flex justify-center gap-2">
        <span className="h-2 w-6 rounded bg-[#e0e0e0]" />
        <span className="h-2 w-2 rounded-full bg-[#e0e0e0]" />
        <span className="h-2 w-2 rounded-full bg-[#e0e0e0]" />
      </div>
    </div>
  );
}
