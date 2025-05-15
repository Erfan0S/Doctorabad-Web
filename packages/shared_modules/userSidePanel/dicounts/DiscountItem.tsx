"use client";
import { DiscountPlan } from "@repo/core/types/user";
import { useEffect, useState } from "react";
import styles from "./Discounts.module.scss";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { useCartActionsLoadingHandler } from "@repo/core/hooks/useCartActionsLoadingHandler";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { cartActions, useCart } from "@repo/core/states/cart";
import { OrderType } from "@repo/core/types/cart";
import { Loading } from "../../common/components";
import Link from "next/link";
import { routePath } from "@repo/core/constants/routePath";
import { useRouter } from "next/navigation";
import { modalActions } from "@repo/core/modal/modals";

type Props = {
  data: DiscountPlan;
};

export const DiscountItem = ({ data }: Props) => {
  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();
  const { data: cartData, initLoading } = useCart();
  const [inCart, setIncart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIncart(
      !!cartData.find(
        (d) =>
          d.product_id === data.id && d.product_type === OrderType.DiscountPlan
      )?.id
    );
  }, [updateCartLoading, cartData]);

  return (
    <div className={styles.discountItemWrapper}>
      <h3>{data?.title}</h3>
      <p>{data?.description}</p>
      <div>
        <span>{priceFormatter(data?.off_price || 0)} تومن</span>
        <span>{priceFormatter(data?.main_price || 0)} تومن</span>
      </div>
      {inCart ? (
        <button
          className={styles.DiscountItemBtn}
          onClick={() => {
            router.push(routePath.checkout);
            modalActions.clearModals();
          }}
        >
          !به سبد خرید اضافه شد
        </button>
      ) : (
        <button
          type="button"
          className={styles.DiscountItemBtn}
          onClick={authorizeClientAction(
            cartActionsLoadingHandler(() =>
              cartActions.addToCart(data.id, OrderType.DiscountPlan)
            )
          )}
        >
          {updateCartLoading ? <Loading color="green" /> : "بزن بریم!"}
        </button>
      )}
    </div>
  );
};
