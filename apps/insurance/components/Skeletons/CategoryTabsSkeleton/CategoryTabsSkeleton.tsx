"use client";

interface CategoryTabsSkeletonProps {
  count?: number;
}

export default function CategoryTabsSkeleton({ count = 6 }: CategoryTabsSkeletonProps) {
  return (
    <div className="flex gap-3 overflow-x-auto px-4 pb-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative h-9 w-20 shrink-0 overflow-hidden rounded-full bg-[#e0e0e0]"
        >
          <div className="h-full w-full animate-shimmer bg-[linear-gradient(90deg,#e0e0e0_0%,#f5f5f5_50%,#e0e0e0_100%)] bg-[length:200%_100%]" />
        </div>
      ))}
    </div>
  );
}

