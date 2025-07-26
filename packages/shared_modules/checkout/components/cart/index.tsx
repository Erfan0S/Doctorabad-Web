"use client";
import { useCart } from "@repo/core/states/cart";
import CartItem from "./item";
import style from "./Cart.module.scss";
import { routePath } from "@repo/core/constants/routePath";
import Link from "next/link";
import { Apps } from "@repo/core/types/general";

type Props = {
  app: Apps;
};

const Cart = ({ app }: Props) => {
  const { data: cartItems, count } = useCart();

  const redirectPath = (): string => {
    switch (app) {
      case Apps.MARKET:
        return routePath.archive;
      case Apps.LEARN:
        return routePath.learnBasePath;

      default:
        return routePath.checkout;
    }
  };

  return (
    <div className={`${style.cart} ${style[app]}`}>
      <div className={style.cartTitle}>
        <span>محصولات‌من</span>
        <small>{count} عدد کالا</small>
      </div>
      <div>
        {cartItems.length ? (
          cartItems.map((cartItem) => {
            const cartItemProps = {
              ...cartItem,
            };
            return <CartItem key={cartItem.id} {...cartItemProps} />;
          })
        ) : (
          // TODO: Might need change
          <Link href={"/"} className={style.cartEmpty}>
            مشاهده محصولات
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;
