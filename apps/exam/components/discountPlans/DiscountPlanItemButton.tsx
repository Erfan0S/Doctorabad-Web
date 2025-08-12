"use client";
import { useCartActionsLoadingHandler } from "@repo/core/hooks/useCartActionsLoadingHandler";
import { cartActions, useCart } from "@repo/core/states/cart";
import React from "react";
import Button from "../common/Button/Button";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { OrderType } from "@repo/core/types/cart";
import Loading from "../common/Loading/Loading";
import Link from "next/link";
import { routePath } from "@repo/core/constants/routePath";
import style from "./discountPlans.module.scss";

function DiscountPlanItemButton({ id }: { id: number }) {
  const { addToCart, removeFromCart } = cartActions;
  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();
  const { data } = useCart();

  const cartId = data?.find((d) => d.product_id === id)?.id;

  if (cartId) {
    return (
      <div className={style.addedPurchaseButtonWrapper}>
        <Button
          variant="outline"
          onClick={cartActionsLoadingHandler(() => removeFromCart(cartId))}
        >
          {updateCartLoading ? <Loading /> : "حذف از سبد خرید"}
        </Button>
        <Button>
          <Link href={routePath.checkout}>مشاهده سبد خرید</Link>
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={authorizeClientAction(
        cartActionsLoadingHandler(() => addToCart(id, OrderType.DiscountPlan))
      )}
    >
      {updateCartLoading ? <Loading /> : "افزودن به سبد خرید"}
    </Button>
  );
}

export default DiscountPlanItemButton;
