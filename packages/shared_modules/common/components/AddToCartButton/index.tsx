"use client";
import React, { useEffect } from "react";
import styles from "./style.module.scss";
import { cartActions, useCart } from "@repo/core/states/cart";
import { Apps } from "@repo/core/types/general";
import { OrderType } from "@repo/core/types/cart";
import { useCartActionsLoadingHandler } from "@repo/core/hooks/useCartActionsLoadingHandler";
import { Button, Loading } from "@repo/shared_modules/components";
import {
  authorizeClientAction,
  isUserLoggedIn,
} from "@repo/core/utils/authUtils";
import { modalActions } from "@repo/core/modal/modals";
import getCheckoutUrl from "@repo/core/utils/getCheckoutUrl";

type Props = {
  id: number;
  type: OrderType;
  app?: Apps;
  children?: React.ReactNode;
  className?: string;
  isColumn?: boolean;
  isFullWidth?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
};

function AddToCartButton({
  id,
  type,
  app = Apps.BASE,
  children,
  isColumn,
  isFullWidth,
  className,
  onClick,
  isLoading = false,
}: Props) {
  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();
  const { data, initLoading } = useCart();
  const orderId = data?.find(
    (d) => d.product_id === id && d.product_type === type,
  )?.id;

  useEffect(() => {
    // console.log("initLoading", initLoading);
    // console.log("isLoading", isLoading);
    // console.log("updateCartLoading", updateCartLoading);
  }, [initLoading, isLoading, updateCartLoading]);

  return (
    <div
      className={` ${
        isFullWidth && styles.fullWidth
      } ${className} ${styles.buttonWrapper}`}
    >
      {isUserLoggedIn() && orderId ? (
        <div
          className={`${styles.addedButtonsWrapper} ${isColumn && styles.column}`}
        >
          <Button
            app={app}
            onClick={cartActionsLoadingHandler(() =>
              cartActions.removeFromCart(orderId),
            )}
            variant="outline"
          >
            {updateCartLoading ? <Loading app={app} /> : "حذف از سبد خرید"}
          </Button>
          <Button
            app={app}
            onClick={() => {
              setTimeout(() => window.open(getCheckoutUrl(true), "_self"), 100);
              modalActions.clearModals();
            }}
          >
            مشاهده سبد خرید
          </Button>
        </div>
      ) : (
        <Button
          app={app}
          onClick={
            onClick
              ? onClick
              : authorizeClientAction(
                  cartActionsLoadingHandler(() =>
                    cartActions.addToCart(id, type),
                  ),
                )
          }
        >
          {updateCartLoading || isLoading || initLoading ? (
            <Loading app={app} />
          ) : (
            children || "افزودن به سبد خرید"
          )}
        </Button>
      )}
    </div>
  );
}

export default AddToCartButton;
