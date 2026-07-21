"use client";

const containerCls =
  "mt-5 flex w-full flex-col items-start gap-4 rounded-[25px] border border-solid border-[#e0e0e0] px-[15px] py-[10px]";
const itemCls = "flex w-full flex-row items-center gap-[10px]";
const rightSideCls = "mx-[10px] flex shrink-0 flex-col gap-[10px]";
const picCls = "relative h-[50px] w-[50px] overflow-hidden rounded-[10px] bg-[#e0e0e0]";
const titleCls = "relative h-3 w-[60px] overflow-hidden rounded-md bg-[#e0e0e0]";
const descriptionCls = "relative h-5 flex-1 overflow-hidden rounded-lg bg-[#e0e0e0]";
const shimmerCls = "skeleton-shimmer";

interface ExplanationSkeletonProps {
  count?: number;
}

export default function ExplanationSkeleton({
  count = 3,
}: ExplanationSkeletonProps) {
  return (
    <div className={containerCls}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={itemCls}>
          <div className={rightSideCls}>
            <div className={picCls}>
              <div className={shimmerCls} />
            </div>
            <div className={titleCls}>
              <div className={shimmerCls} />
            </div>
          </div>
          <div className={descriptionCls}>
            <div className={shimmerCls} />
          </div>
        </div>
      ))}
    </div>
  );
}
