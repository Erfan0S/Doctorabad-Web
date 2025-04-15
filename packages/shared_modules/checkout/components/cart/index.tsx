"use client";
import { useCart } from "@repo/core/states/cart";
import CartItem from "./item";
import style from "./Cart.module.scss";
import { routePath } from "@repo/core/constants/routePath";
import { CheckoutPageTypes } from "@repo/core/types/cart";
import Link from "next/link";

type Props = {
  type: CheckoutPageTypes;
};

const Cart = ({ type }: Props) => {
  const { data: cartItems, count } = useCart();

  const redirectPath = (): string => {
    switch (type) {
      case CheckoutPageTypes.Market:
        return routePath.archive;
      case CheckoutPageTypes.Learn:
        return routePath.learnBasePath;

      default:
        return routePath.checkout;
    }
  };

  return (
    <div className={style.cart}>
      <div className={style.cartTitle}>
        <span>سبدخرید</span>
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
