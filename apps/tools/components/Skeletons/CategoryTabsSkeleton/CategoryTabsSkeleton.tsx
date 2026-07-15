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
          className="relative h-9 w-20 flex-shrink-0 overflow-hidden rounded-full bg-[#e0e0e0]"
        >
          <div className="skeleton-shimmer" />
        </div>
      ))}
    </div>
  );
}
