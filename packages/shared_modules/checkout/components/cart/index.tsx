"use client";
import { useCart } from "@repo/core/states/cart";
import CartItem from "./item";
import style from "./Cart.module.scss";
import { routePath } from "@repo/core/constants/routePath";
import Link from "next/link";
import { Apps } from "@repo/core/types/general";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { useEffect } from "react";
import ProductSlider from "./ProductSlider";

type Props = {
  app: Apps;
};

const Cart = ({ app }: Props) => {
  const { data: cartItems, count } = useCart();

  const { data: cartSuggested, isLoading: isLoadingSuggested } = useQuery({
    queryFn: api.getCartSuggested,
    queryKey: ["cartSuggested"],
  });
  const { data: cartLastSeen, isLoading: isLoadingLastSeen } = useQuery({
    queryFn: api.getCartLastSeen,
    queryKey: ["cartLastSeen"],
  });
  const { data: cartOthersBought, isLoading: isLoadingOthersBought } = useQuery(
    {
      queryFn: api.getCartOthersBought,
      queryKey: ["cartOthersBought"],
    }
  );

  return (
    <div className={`${style.cart} ${style[app]}`}>
      <div>
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

      <div className={style.cartSggestions}>
        {!!cartLastSeen?.data.data.length && (
          <ProductSlider
            data={cartLastSeen?.data.data || []}
            isLoading={isLoadingLastSeen}
            title="بازدیدهای اخیر من"
          />
        )}
        {!!cartSuggested?.data.data.length && (
          <ProductSlider
            data={cartSuggested?.data.data || []}
            isLoading={isLoadingSuggested}
            title="پیشنهاد کد‌خدای دکترآباد در کنار محصولات‌من!"
          />
        )}
        {!!cartOthersBought?.data.data.length && (
          <ProductSlider
            data={cartOthersBought?.data.data || []}
            isLoading={isLoadingOthersBought}
            title="دکترآبادی‌ها در کنار محصولات‌من، محصولات زیر را هم خریدن!"
          />
        )}
      </div>
    </div>
  );
};

export default Cart;
