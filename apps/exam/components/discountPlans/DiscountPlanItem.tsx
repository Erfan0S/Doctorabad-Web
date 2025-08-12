import { DiscountPlanType } from "@/types/discountPlan";
import React from "react";
import style from "./discountPlans.module.scss";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import VipIcon from "@/assets/svg/add";
import DiscountPlanItemButton from "./DiscountPlanItemButton";

type Props = {
  item: DiscountPlanType;
};

function DiscountPlanItem({ item }: Props) {
  return (
    <div className={`card ${style.planItem}`}>
      <div className={style.planItemTop}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {item.vip && <VipIcon />}
      </div>
      <div className={style.planItemBottem}>
        <span>{priceFormatter(item.main_price)} تومن</span>
        <DiscountPlanItemButton id={item.id} />
      </div>
    </div>
  );
}

export default DiscountPlanItem;
