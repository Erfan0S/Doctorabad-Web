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
import { useEffect } from "react";

import { isServerSide } from "@repo/core/constants/constants";
import CartIcon from "@/assets/svg/newIcons/cart";
import getCheckoutUrl from "@repo/core/utils/getCheckoutUrl";

// was CartButton.module.scss; empty/full variants are swapped (not stacked)
// so bg/border/text utilities never conflict.
const BUTTON_BASE =
  "flex items-center border-2 border-solid px-2 text-[13px] font-semibold rounded-lg leading-9 cursor-pointer max-md:p-1 [&_svg]:ms-2";
const BUTTON_EMPTY = "bg-white border-red text-red";
const BUTTON_FULL =
  "bg-orange border-white text-white shadow-[0_0_5px_rgba(0,0,0,0.5)]";

const CartButton = () => {
  const router = useRouter();
  const cart = useCart();

  useEffect(() => {
    if (isUserLoggedIn()) cartActions.getCartData();
  }, []);

  const loading = (cart.initLoading && isUserLoggedIn()) || isServerSide;

  return (
    <div className="ms-[10px]">
      <span
        className={`${BUTTON_BASE} ${cart.data.length ? BUTTON_FULL : BUTTON_EMPTY}`}
        onClick={authorizeClientAction(() =>
          window.open(getCheckoutUrl(true), "_self")
        )}
      >
        {cart.data.length && !loading ? (
          <>
            <small className="bg-white text-orange rounded px-2 text-base font-semibold leading-[25px] me-2">
              {cart.count}
            </small>
            <span className="max-md:hidden"> کالا در سبدخریدمن</span>
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
