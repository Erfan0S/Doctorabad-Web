import React from "react";
import { PreviousOrder } from "../../../checkout/types/orders";
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
    <div className="card flex cursor-pointer flex-row items-center justify-start gap-[15px] border border-solid border-gray-light p-2 shadow-[0_2px_4px_rgba(0,0,0,0.1)]" onClick={handleOnClick}>
      <div className="flex items-center justify-center rounded-[10px] border border-solid border-gray-light bg-white p-3 [&_svg]:h-auto [&_svg]:w-[45px] [&_svg]:text-[30px] [&_svg]:text-green">
        <CartIcon />
      </div>
      <div className="flex flex-wrap items-stretch justify-start gap-4 text-[11px] text-gray [&_svg]:h-auto [&_svg]:w-[17px] [&>div]:flex [&>div]:flex-col [&>div]:justify-end [&>div]:gap-2 [&_span]:flex [&_span]:items-center [&_span]:gap-2 max-[425px]:text-[10px] max-[425px]:[&_svg]:w-[15px]">
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
