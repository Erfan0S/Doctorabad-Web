"use client";
import React from "react";
import styles from "./style.module.scss";
import { cartActions, useCart } from "@repo/core/states/cart";
import { Apps } from "@repo/core/types/general";
import { OrderType } from "@repo/core/types/cart";
import { useCartActionsLoadingHandler } from "@repo/core/hooks/useCartActionsLoadingHandler";
import { Button, Loading } from "@repo/shared_modules/components";
import { routePath } from "@repo/core/constants/routePath";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { modalActions } from "@repo/core/modal/modals";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
  type: OrderType;
  app?: Apps;
  children?: React.ReactNode;
  className?: string;
  isColumn?: boolean;
  isFullWidth?: boolean;
};

function AddToCartButton({
  id,
  type,
  app = Apps.BASE,
  children,
  isColumn,
  isFullWidth,
  className,
}: Props) {
  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();
  const { data, initLoading } = useCart();
  const orderId = data?.find(
    (d) => d.product_id === id && d.product_type === type
  )?.id;
  const router = useRouter();

  return (
    <div
      className={` ${
        isFullWidth && styles.fullWidth
      } ${className} ${styles.buttonWrapper}`}
    >
      {orderId ? (
        <div
          className={`${styles.addedButtonsWrapper} ${isColumn && styles.column}`}
        >
          <Button
            app={app}
            onClick={cartActionsLoadingHandler(() =>
              cartActions.removeFromCart(orderId)
            )}
            variant="outline"
          >
            {updateCartLoading ? <Loading app={app} /> : "حذف از سبد خرید"}
          </Button>
          <Button
            app={app}
            onClick={() => {
              router.push(routePath.checkout);
              modalActions.clearModals();
            }}
          >
            مشاهده سبد خرید
          </Button>
        </div>
      ) : (
        <Button
          app={app}
          onClick={authorizeClientAction(
            cartActionsLoadingHandler(() => cartActions.addToCart(id, type))
          )}
        >
          {updateCartLoading ? (
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
