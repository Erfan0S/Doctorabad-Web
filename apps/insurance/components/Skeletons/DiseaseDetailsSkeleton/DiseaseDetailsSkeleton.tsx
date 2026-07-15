"use client";

const shimmerCls =
  "h-full w-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,#e0e0e0_0%,#f5f5f5_50%,#e0e0e0_100%)] bg-[length:200%_100%]";

export default function DiseaseDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center gap-4">
        <div className="relative h-[120px] w-[120px] overflow-hidden rounded-2xl bg-[#e0e0e0]">
          <div className={shimmerCls} />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="relative h-6 overflow-hidden rounded-lg bg-[#e0e0e0]">
            <div className={shimmerCls} />
          </div>
          <div className="relative h-6 overflow-hidden rounded-lg bg-[#e0e0e0]">
            <div className={shimmerCls} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-2xl border border-solid border-[#f0f0f0] bg-white p-4"
          >
            <div className="relative h-5 overflow-hidden rounded-lg bg-[#e0e0e0]">
              <div className={shimmerCls} />
            </div>
            <div className="relative h-12 overflow-hidden rounded-lg bg-[#e0e0e0]">
              <div className={shimmerCls} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

