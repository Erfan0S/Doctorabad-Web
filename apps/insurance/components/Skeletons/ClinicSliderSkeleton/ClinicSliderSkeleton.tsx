// components/Skeletons/ClinicSliderSkeleton.tsx
"use client";

const dotCls = "h-2 w-2 rounded-full bg-[#e0e0e0] first:w-6 first:rounded";

export default function ClinicSliderSkeleton() {
  return (
    <div className="relative bg-white p-4 pb-6">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#e0e0e0]">
        <div className="h-full w-full animate-shimmer bg-[linear-gradient(90deg,#e0e0e0_0%,#f0f0f0_20%,#e0e0e0_40%,#e0e0e0_100%)] bg-[length:200%_100%]"></div>
      </div>
      <div className="mt-2 flex justify-center gap-2">
        <span className={dotCls}></span>
        <span className={dotCls}></span>
        <span className={dotCls}></span>
      </div>
    </div>
  );
}