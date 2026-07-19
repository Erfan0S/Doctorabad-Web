"use client";
import React, { useEffect } from "react";
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
  onSucceed?: () => void;
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
  onSucceed,
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
          isFullWidth && "w-full [&>button]:w-full"
        } ${className}`}
      >
        <Button app={app}>{children || "افزودن به سبد خرید"}</Button>
      </div>
    );
  }

  const validateVariants = () => {
    // TODO: add validation for variants before add to cart
    if (!variants) return true;
  };

  return (
    <div
      className={`[&>button]:w-full ${
        isFullWidth && "w-full"
      } ${className}`}
    >
      {isUserLoggedIn() && orderId && quantity ? (
        <div
          className={`flex w-full items-center gap-[10px] whitespace-pre text-center [&>button]:h-[43px] [&>button]:flex-1 [&>div]:h-[43px] [&>div]:flex-1 ${isColumn && "flex-col"}`}
        >
          {canIncrease ? (
            <QuantityProductButton
              orderId={orderId}
              quantity={quantity}
              orderType={type}
              app={app}
              style="outline"
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
          onClick={
            onClick
              ? onClick
              : authorizeClientAction(
                  cartActionsLoadingHandler(() =>
                    cartActions.addToCart(id, type, variants).then(() => {
                      onSucceed && onSucceed();
                    }),
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
