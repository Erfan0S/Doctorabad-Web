"use client";

import type { PlanItem as DrProPlanItem } from "@repo/core/types/dr-pro";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import styles from "./Plans.module.scss";

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
    <label className={`${styles.planItem} ${selected ? styles.selected : ""}`}>
      <input
        type="radio"
        name="dr-pro-plan"
        checked={selected}
        onChange={() => onSelect(plan.id)}
        className={styles.radio}
      />
      <span className={styles.title}>{plan.title}</span>
      <div className={styles.prices}>
        <div className={styles.discount}>

      {discountPercent != null && (
          <span className={styles.discountPercent}>{discountPercent}٪</span>
        )}
        {hasDiscount && (
            <span className={styles.mainPrice}>
            {priceFormatter(plan.main_price)} تومان
          </span>
        )}
        </div>
        <span className={styles.offPrice}>
          {priceFormatter(displayPrice)} تومان
        </span>

      </div>
    </label>
  );
}
