"use client";

interface CategoriesSkeletonProps {
  items?: number;
  nested?: boolean;
}

export default function CategoriesSkeleton({
  items = 4,
  nested = false,
}: CategoriesSkeletonProps) {
  return (
    <div
      className={
        nested ? "flex flex-col gap-2 pe-4 pt-3" : "flex flex-col gap-3 p-4"
      }
    >
      {Array.from({ length: items }).map((_, index) => (
        <div
          key={index}
          className="relative h-12 overflow-hidden rounded-xl bg-[#e0e0e0]"
        >
          <div className="skeleton-shimmer" />
        </div>
      ))}
    </div>
  );
}
