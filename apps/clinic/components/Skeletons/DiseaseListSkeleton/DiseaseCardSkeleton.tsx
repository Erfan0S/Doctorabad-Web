// components/Skeletons/DiseaseCardSkeleton.tsx
"use client";

export default function DiseaseCardSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-solid border-[#e0e0e0] bg-white p-2.5">
      <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-xl bg-[#e0e0e0]">
        <div className="skeleton-shimmer" />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="relative h-5 w-[70%] overflow-hidden rounded bg-[#e0e0e0]">
          <div className="skeleton-shimmer" />
        </div>
        <div className="relative h-5 w-[85%] overflow-hidden rounded bg-[#e0e0e0]">
          <div className="skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}
