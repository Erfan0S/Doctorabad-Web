"use client";
import Image from "next/image";
import {
  authorizeClientAction,
  isUserLoggedIn,
} from "@repo/core/utils/authUtils";
import { routePath } from "@repo/core/constants/routePath";
import { useRouter } from "next/navigation";
import { cartActions, useCart } from "@repo/core/states/cart";
import cartIcon from "@/assets/img/cart.png";
import style from "./CartButton.module.scss";
import { useEffect } from "react";

import { isServerSide } from "@repo/core/constants/constants";
import CartIcon from "@/assets/svg/newIcons/cart";
import getCheckoutUrl from "@repo/core/utils/getCheckoutUrl";

const CartButton = () => {
  const router = useRouter();
  const cart = useCart();

  useEffect(() => {
    if (isUserLoggedIn()) cartActions.getCartData();
  }, []);

  const loading = (cart.initLoading && isUserLoggedIn()) || isServerSide;

  return (
    <div
      className={`${style.cartButton} ${cart.data.length ? style.hasItem : ""}`}
    >
      <span
        onClick={authorizeClientAction(() =>
          window.open(getCheckoutUrl(true), "_self")
        )}
      >
        {cart.data.length && !loading ? (
          <>
            <small>{cart.count}</small>
            <span> کالا در سبدخریدمن</span>
          </>
        ) : (
          "سبدخریدمن"
        )}
        <CartIcon />
      </span>
    </div>
  );
};
export default CartButton;
