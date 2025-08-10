import React from "react";
import { PreviousOrder } from "../../../checkout/types/orders";
import style from "./cartOrders.module.scss";
import { CartIcon } from "../../../assets";
import CartCheckIcon from "../../../assets/svg/cartCheck";
import CardCheck from "../../../assets/svg/cardCheck";
import CalenderCheck from "../../../assets/svg/calenderCheck";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { toFullPersianDateString } from "@repo/core/utils/toFullPersianDateString";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "../../../common/modal/modalsTypes";

function CartOrdersItem({ order }: { order: PreviousOrder }) {
  const handleOnClick = () => {
    modalActions.addModal(ModalTypes.ORDER_DETAIL, {
      orderCode: order.order_code,
    });
  };

  return (
    <div className={`card ${style.cartOrdersItem}`} onClick={handleOnClick}>
      <div className={style.cartOrdersItemIcon}>
        <CartIcon />
      </div>
      <div className={style.cartOrdersItemInfo}>
        <div>
          <span>
            <CartCheckIcon /> {order.order_code}
          </span>
          <span>
            <CalenderCheck fontSize={16} />
            {toFullPersianDateString(order.created_at)}
          </span>
        </div>
        <div>
          <span>
            <CardCheck fontSize={16} />
            {priceFormatter(order.price_paid)}تومان
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartOrdersItem;
