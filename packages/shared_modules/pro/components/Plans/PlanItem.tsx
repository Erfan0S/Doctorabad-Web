"use client";

import type { PlanItem as DrProPlanItem } from "@repo/core/types/dr-pro";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
const planItemCls =
  "flex w-full cursor-pointer items-center gap-3 rounded-2xl border-solid bg-white px-4 py-3 transition-[border-width] duration-150 ease-[ease]";
const planItemSelectedCls = "border-2 border-green-pro";
const planItemUnselectedCls = "border border-black";
const radioCls = "h-5 w-5 shrink-0 cursor-pointer accent-green-pro";
const titleCls = "flex-1 text-[16px] font-bold text-black text-end";
const pricesCls = "flex shrink-0 flex-col items-center gap-2";
const mainPriceCls = "text-[14px] text-gray line-through";
const offPriceCls = "text-[16px] font-extrabold text-green-pro";
const discountPercentCls =
  "rounded-lg bg-green-pro px-2 py-[2px] text-[13px] font-bold text-white";
const discountCls = "flex flex-row-reverse gap-[5px]";

interface PlanItemProps {
  plan: DrProPlanItem;
  selected: boolean;
  onSelect: (id: number) => void;
}

function getDiscountPercent(mainPrice: number, offPrice: number | null) {
  if (!offPrice || offPrice >= mainPrice) return null;
  return Math.round((1 - offPrice / mainPrice) * 100);
}

export default function PlanItem({ plan, selected, onSelect }: PlanItemProps) {
  const hasDiscount = plan.off_price != null && plan.off_price < plan.main_price;
  const discountPercent = getDiscountPercent(plan.main_price, plan.off_price);
  const displayPrice = plan.off_price ?? plan.main_price;

  return (
    <label className={`${planItemCls} ${selected ? planItemSelectedCls : planItemUnselectedCls}`}>
      <input
        type="radio"
        name="dr-pro-plan"
        checked={selected}
        onChange={() => onSelect(plan.id)}
        className={radioCls}
      />
      <span className={titleCls}>{plan.title}</span>
      <div className={pricesCls}>
        <div className={discountCls}>

      {discountPercent != null && (
          <span className={discountPercentCls}>{discountPercent}٪</span>
        )}
        {hasDiscount && (
            <span className={mainPriceCls}>
            {priceFormatter(plan.main_price)} تومان
          </span>
        )}
        </div>
        <span className={offPriceCls}>
          {priceFormatter(displayPrice)} تومان
        </span>

      </div>
    </label>
  );
}
