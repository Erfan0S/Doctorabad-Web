"use client";
import { DiscountPlan } from "@repo/core/types/user";
import { useEffect, useState } from "react";
import styles from "./Discounts.module.scss";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { useCartActionsLoadingHandler } from "@repo/core/hooks/useCartActionsLoadingHandler";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { cartActions, useCart } from "@repo/core/states/cart";
import { OrderType } from "@repo/core/types/cart";
import { Button, Loading } from "../../common/components";
import { routePath } from "@repo/core/constants/routePath";
import { useRouter } from "next/navigation";
import { modalActions } from "@repo/core/modal/modals";
import { Apps } from "@repo/core/types/general";

type Props = {
  data: DiscountPlan;
};

export const DiscountItem = ({ data }: Props) => {
  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();
  const { data: cartData, initLoading } = useCart();
  const [cartId, setCartId] = useState<number | null>();
  const router = useRouter();

  useEffect(() => {
    setCartId(
      cartData.find(
        (d) =>
          d.product_id === data.id && d.product_type === OrderType.DiscountPlan
      )?.id
    );
  }, [updateCartLoading, cartData]);

  const ButtonRender = () => {
    return !!cartId ? (
      <>
        <Button
          type="button"
          variant="outline"
          className={styles.DiscountItemBtn}
          onClick={authorizeClientAction(
            cartActionsLoadingHandler(() => cartActions.removeFromCart(cartId))
          )}
        >
          {updateCartLoading ? <Loading app={Apps.BASE} /> : "حدف از سبد خرید"}
        </Button>
        <Button
          type="button"
          className={styles.DiscountItemBtn}
          onClick={() => {
            router.push(routePath.checkout);
            modalActions.clearModals();
          }}
        >
          مشاهده سبد خرید
        </Button>
      </>
    ) : (
      <Button
        type="button"
        className={styles.DiscountItemBtn}
        onClick={authorizeClientAction(
          cartActionsLoadingHandler(() =>
            cartActions.addToCart(data.id, OrderType.DiscountPlan)
          )
        )}
      >
        {updateCartLoading ? (
          <Loading app={Apps.BASE} />
        ) : (
          "!افزودن به سبد خرید"
        )}
      </Button>
    );
  };

  return (
    <div className={styles.discountItemWrapper}>
      <h3>{data?.title}</h3>
      <p>{data?.description}</p>
      <div>
        <span>{priceFormatter(data?.off_price || 0)} تومن</span>
        <span>{priceFormatter(data?.main_price || 0)} تومن</span>
      </div>
      <div className={styles.discountItemBtnWrapper}>
        <ButtonRender />
      </div>
    </div>
  );
};
