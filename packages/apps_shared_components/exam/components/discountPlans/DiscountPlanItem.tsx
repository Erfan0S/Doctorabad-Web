import { DiscountPlanType } from "../../types/discountPlan";
import React from "react";
import style from "./discountPlans.module.scss";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import VipIcon from "../../assets/svg/vipIcon";
import {
  AddToCartButton,
  ListProductSnappayNotif,
  ProductSnappayNotif,
} from "@repo/shared_modules/components";
import { OrderType } from "@repo/core/types/cart";
import { Apps } from "@repo/core/types/general";
import { cartActions } from "@repo/core/states/cart";

type Props = {
  item: DiscountPlanType;
};

function DiscountPlanItem({ item }: Props) {
  cartActions.getCartData();
  return (
    <div className={`card ${style.planItem}`}>
      <div className={style.planItemTop}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        {item.vip && <VipIcon />}
      </div>
      <div className={style.planItemBottem}>
        <div className={style.planItemPrice}>
          {!!item.off_price && (
            <span>{priceFormatter(item.main_price)} تومن</span>
          )}
          <span>
            {(!item.main_price && !item.off_price) || item.free
              ? "رایگان"
              : `${priceFormatter(item.off_price || item.main_price)} تومن`}
          </span>
          {item.installment_payment && item.installment_text && (
            <ProductSnappayNotif
              text={item.off_price || item.main_price}
              className={style.listSnappayNotif}
            />
          )}
        </div>
        <AddToCartButton
          id={item.id}
          type={OrderType.DiscountPlan}
          app={Apps.EXAM}
          className={style.addToCartButton}
        />
      </div>
    </div>
  );
}

export default DiscountPlanItem;
