import RecycleBin from "../../../assets/svg/recycleBin";
import style from "./QuantityProductButton.module.scss";
import React from "react";
import { cartActions } from "@repo/core/states/cart";
import { Loading } from "..";
import { Apps } from "@repo/core/types/general";
import { useCartActionsLoadingHandler } from "@repo/core/hooks/useCartActionsLoadingHandler";
import { OrderType } from "@repo/core/types/cart";

export interface Props {
  orderId: number;
  quantity: number;
  orderType: OrderType;
  app?: Apps;
  className?: string;
  style?: "default" | "outline";
}

const QuantityProductButton: React.FC<Props> = ({
  className,
  app = Apps.MARKET,
  orderId,
  quantity,
  style: componentStyle,
}) => {
  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();

  return (
    <div
      className={`${style.quantityButton} ${style[componentStyle || "default"]}  ${className} ${style[app]}`}
    >
      <button
        onClick={cartActionsLoadingHandler(() =>
          quantity > 1
            ? cartActions.decreaseQuantity(orderId)
            : cartActions.removeFromCart(orderId),
        )}
      >
        {quantity > 1 ? "-" : <RecycleBin height={20} width={20} />}
      </button>
      <span>
        {updateCartLoading ? <Loading size={15} app={app} /> : quantity}
      </span>
      <button
        onClick={cartActionsLoadingHandler(() =>
          cartActions.increaseQuantity(orderId),
        )}
      >
        +
      </button>
    </div>
  );
};
export default QuantityProductButton;
