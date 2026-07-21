"use client";

const containerCls =
  "flex w-full items-center justify-between rounded-[20px] border border-solid border-[#e0e0e0] px-[15px] py-3";
const titleCls = "relative h-6 w-[120px] overflow-hidden rounded-lg bg-[#e0e0e0]";
const badgeCls = "relative h-8 w-[100px] overflow-hidden rounded-2xl bg-[#e0e0e0]";
const shimmerCls = "skeleton-shimmer";

export default function ActivePlanSkeleton() {
  return (
    <div className={containerCls}>
      <div className={titleCls}>
        <div className={shimmerCls} />
      </div>
      <div className={badgeCls}>
        <div className={shimmerCls} />
      </div>
    </div>
  );
}
