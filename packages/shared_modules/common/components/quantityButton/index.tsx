import RecycleBin from "../../../assets/svg/recycleBin";
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
      className={`flex flex-1 flex-row-reverse items-center justify-around rounded-[12px] px-[4px] py-[8px] text-[14px] [&_span]:w-[25px] [&_span]:text-center [&_button]:m-0 [&_button]:flex [&_button]:h-[25px] [&_button]:w-[25px] [&_button]:cursor-pointer [&_button]:items-center [&_button]:justify-center [&_button]:border-none [&_button]:bg-transparent [&_button]:p-0 [&_button]:text-[25px] [&_button]:leading-[40px] [&_button:hover]:outline-none [&_button:active]:outline-none [&_button:focus]:outline-none ${
        componentStyle === "outline"
          ? "border-2 border-solid border-app-base bg-transparent text-app-base [&_span]:text-app-base [&_button]:text-app-base"
          : "bg-button-bg text-white [&_span]:text-white [&_button]:text-white"
      } ${className} ${app}`}
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
