"use client";
import { useCart } from "@repo/core/states/cart";
import CartItem from "./item";
import style from "./Cart.module.scss";
import { baseUrls } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import ProductSlider from "./ProductSlider";
import { useSearchParams } from "next/navigation";
import { REDIRECTED_APP_KEY } from "@repo/core/constants/queryKeys";

type Props = {
  app: Apps;
};

const Cart = ({ app }: Props) => {
  const { data: cartItems, count } = useCart();
  const redirectedApp = useSearchParams()?.get(REDIRECTED_APP_KEY) as
    | Apps
    | undefined;

  const { data: cartSuggested, isLoading: isLoadingSuggested } = useQuery({
    queryFn: api.getCartSuggested,
    queryKey: ["cartSuggested", cartItems],
  });
  const { data: cartLastSeen, isLoading: isLoadingLastSeen } = useQuery({
    queryFn: api.getCartLastSeen,
    queryKey: ["cartLastSeen"],
  });
  const { data: cartOthersBought, isLoading: isLoadingOthersBought } = useQuery(
    {
      queryFn: api.getCartOthersBought,
      queryKey: ["cartOthersBought", cartItems],
    }
  );

  const appLink = redirectedApp
    ? baseUrls[redirectedApp]
    : baseUrls[Apps.MARKET];

  return (
    <div className={`${style.cart} ${style[app]}`}>
      <div>
        <div className={style.cartTitle}>
          <span>محصولات‌من</span>
          <small>{count} عدد کالا</small>
        </div>
        <div>
          {cartItems.length ? (
            cartItems.map((cartItem, i) => {
              const cartItemProps = {
                ...cartItem,
              };
              return (
                <CartItem key={`${cartItem.id}-${i}`} {...cartItemProps} />
              );
            })
          ) : (
            // TODO: Might need change
            <a href={appLink} className={style.cartEmpty}>
              مشاهده محصولات
            </a>
          )}
        </div>
      </div>

      <div className={style.cartSggestions}>
        {!!cartLastSeen?.data.data.length && (
          <ProductSlider
            data={cartLastSeen?.data.data || []}
            isLoading={isLoadingLastSeen}
            title="بازدیدهای اخیر من"
            key={"lastSeen"}
          />
        )}
        {!!cartSuggested?.data.data.length && (
          <ProductSlider
            data={cartSuggested?.data.data || []}
            isLoading={isLoadingSuggested}
            title="پیشنهاد کد‌خدای دکترآباد در کنار محصولات‌من!"
            key={"suggested"}
          />
        )}
        {!!cartOthersBought?.data.data.length && (
          <ProductSlider
            data={cartOthersBought?.data.data || []}
            isLoading={isLoadingOthersBought}
            title="دکترآبادی‌ها در کنار محصولات‌من، محصولات زیر را هم خریدن!"
            key={"othersBought"}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;
