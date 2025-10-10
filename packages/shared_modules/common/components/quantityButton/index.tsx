import RecycleBin from "../../../assets/svg/recycleBin";
import style from "./QuantityProductButton.module.scss";
import React from "react";
import { cartActions } from "@repo/core/states/cart";
import { Loading } from "..";
import { Apps } from "@repo/core/types/general";

export interface Props {
  id: number;
  quantity: number;
  cardActionsLoadingHandler: (fn: () => Promise<any>) => () => void;
  app?: Apps;
  className?: string;
  isLoadibg?: boolean;
}

const QuantityProductButton: React.FC<Props> = ({
  id,
  quantity,
  cardActionsLoadingHandler,
  className,
  isLoadibg,
  app = Apps.MARKET,
}) => {
  return (
    <div className={`${style.quantityButton} ${className} ${style[app]}`}>
      <button
        onClick={cardActionsLoadingHandler(() =>
          quantity > 1
            ? cartActions.decreaseQuantity(id)
            : cartActions.removeFromCart(id)
        )}
      >
        {quantity > 1 ? "-" : <RecycleBin height={20} width={20} />}
      </button>
      <span>{isLoadibg ? <Loading size={15} app={app} /> : quantity}</span>
      <button
        onClick={cardActionsLoadingHandler(() =>
          cartActions.increaseQuantity(id)
        )}
      >
        +
      </button>
    </div>
  );
};
export default QuantityProductButton;
