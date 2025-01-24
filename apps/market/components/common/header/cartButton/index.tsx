"use client";
import Image from "next/image";
import { authorizeClientAction, isUserLoggedIn } from "@repo/core/utils";
import { routePath } from "@repo/core/constants";
import { useRouter } from "next/navigation";
import { cartActions, useCart } from "@repo/core/states";
import cartIcon from "@/assets/img/cart.png";
import style from "./CartButton.module.scss";
import { useEffect } from "react";

import { isServerSide } from "@repo/core/constants";
import CartIcon from "@/assets/svg/newIcons/cart";

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
        onClick={authorizeClientAction(() => router.push(routePath.checkout))}
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
