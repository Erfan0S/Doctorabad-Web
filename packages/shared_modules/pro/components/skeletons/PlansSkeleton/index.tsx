"use client";

const plansListCls = "mt-4 flex w-full flex-col gap-3 [direction:rtl]";
const planItemCls =
  "flex w-full items-center gap-3 rounded-2xl border border-solid border-[#e0e0e0] px-4 py-3";
const radioCls = "relative h-5 w-5 shrink-0 overflow-hidden rounded-full bg-[#e0e0e0]";
const titleCls = "relative h-5 flex-1 overflow-hidden rounded-lg bg-[#e0e0e0]";
const pricesCls = "flex shrink-0 flex-col items-center gap-2";
const priceRowCls = "relative h-[14px] w-20 overflow-hidden rounded-md bg-[#e0e0e0]";
const offPriceCls = "relative h-[18px] w-[90px] overflow-hidden rounded-md bg-[#e0e0e0]";
const shimmerCls = "skeleton-shimmer";

interface PlansSkeletonProps {
  count?: number;
}

export default function PlansSkeleton({ count = 3 }: PlansSkeletonProps) {
  return (
    <div className={plansListCls}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={planItemCls}>
          <div className={radioCls}>
            <div className={shimmerCls} />
          </div>
          <div className={titleCls}>
            <div className={shimmerCls} />
          </div>
          <div className={pricesCls}>
            <div className={priceRowCls}>
              <div className={shimmerCls} />
            </div>
            <div className={offPriceCls}>
              <div className={shimmerCls} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
