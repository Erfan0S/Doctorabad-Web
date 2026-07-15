"use client";

interface CategoriesSkeletonProps {
  items?: number;
  nested?: boolean;
}

const shimmerCls =
  "h-full w-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,#e0e0e0_0%,#f7f7f7_50%,#e0e0e0_100%)] bg-[length:200%_100%]";

export default function CategoriesSkeleton({
  items = 4,
  nested = false,
}: CategoriesSkeletonProps) {
  return (
    <div
      className={
        nested ? "flex flex-col gap-2 pl-4 pt-3" : "flex flex-col gap-3 p-4"
      }
    >
      {Array.from({ length: items }).map((_, index) => (
        <div
          key={index}
          className="relative h-12 overflow-hidden rounded-xl bg-[#e0e0e0]"
        >
          <div className={shimmerCls} />
        </div>
      ))}
    </div>
  );
}

