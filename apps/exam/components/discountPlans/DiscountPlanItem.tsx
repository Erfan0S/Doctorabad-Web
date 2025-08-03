import {DiscountPlanType} from "@/types/discountPlan";
import React from "react";
import style from "./discountPlans.module.scss";
import Button from "../common/Button/Button";
import {priceFormatter} from "@repo/core/utils/priceFormatter";

type Props = {
  item: DiscountPlanType;
};

function DiscountPlanItem({item}: Props) {
  console.log(item);
  return (
    <div className={`card ${style.planItem}`}>
      <div className={style.planItemTop}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {item.vip && <span>vip</span>}
      </div>
      <div className={style.planItemBottem}>
        <span>{priceFormatter(item.main_price)} تومن</span>
        <Button>افزودن به سبد خرید</Button>
      </div>
    </div>
  );
}

export default DiscountPlanItem;
