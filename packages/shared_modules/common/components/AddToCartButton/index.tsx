"use client";
import React, { useEffect } from "react";
import styles from "./style.module.scss";
import { cartActions, useCart } from "@repo/core/states/cart";
import { Apps } from "@repo/core/types/general";
import { OrderType } from "@repo/core/types/cart";
import { useCartActionsLoadingHandler } from "@repo/core/hooks/useCartActionsLoadingHandler";
import {
  Button,
  Loading,
  QuantityProductButton,
} from "@repo/shared_modules/components";
import {
  authorizeClientAction,
  isUserLoggedIn,
} from "@repo/core/utils/authUtils";
import { modalActions } from "@repo/core/modal/modals";
import getCheckoutUrl from "@repo/core/utils/getCheckoutUrl";
import { ProductVariantsValue } from "@repo/core/types/productVariants";

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
  canIncrease?: boolean;
  compact?: boolean;
  variants?: ProductVariantsValue[];
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
  isLoading,
  canIncrease,
  compact,
  variants,
}: Props) {
  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();
  const { data, initLoading } = useCart();
  const order = data?.find(
    (d) => d.product_id === id && d.product_type === type,
  );
  const orderId = order?.id;
  const quantity = order?.quantity;

  /* To prevent Hydration Mismatch */
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (initLoading) {
      cartActions.getCartData();
    }
  }, [initLoading]);

  if (!mounted) {
    return (
      <div
        className={` ${
          isFullWidth && styles.fullWidth
        } ${className} ${styles.buttonWrapper}`}
      >
        <Button app={app}>{children || "افزودن به سبد خرید"}</Button>
      </div>
    );
  }

  return (
    <div
      className={`${styles.addToCartWrapper} ${
        isFullWidth && styles.fullWidth
      } ${className} ${styles.buttonWrapper}`}
    >
      {isUserLoggedIn() && orderId && quantity ? (
        <div
          className={`${styles.addedButtonsWrapper} ${isColumn && styles.column}`}
        >
          {canIncrease ? (
            <QuantityProductButton
              orderId={orderId}
              quantity={quantity}
              orderType={type}
              app={app}
              style="outline"
              className={styles.quantityButton}
            />
          ) : (
            <Button
              app={app}
              onClick={cartActionsLoadingHandler(() =>
                cartActions.removeFromCart(orderId),
              )}
              variant="outline"
            >
              {updateCartLoading ? <Loading app={app} /> : "حذف از سبد خرید"}
            </Button>
          )}
          {!compact && (
            <Button
              app={app}
              onClick={() => {
                setTimeout(
                  () => window.open(getCheckoutUrl(true), "_self"),
                  100,
                );
                modalActions.clearModals();
              }}
            >
              مشاهده سبد خرید
            </Button>
          )}
        </div>
      ) : (
        <Button
          app={app}
          className={styles.addToCartButton}
          onClick={
            onClick
              ? onClick
              : authorizeClientAction(
                  cartActionsLoadingHandler(() =>
                    cartActions.addToCart(id, type, variants),
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
