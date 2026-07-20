"use client";
import { useCart } from "@repo/core/states/cart";
import CartItem from "./item";
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
    },
  );

  const appLink = redirectedApp
    ? baseUrls[redirectedApp]
    : baseUrls[Apps.MARKET];

  return (
    <div
      className={`flex h-full flex-col justify-between overflow-visible text-center max-xl:h-auto [&::-webkit-scrollbar]:w-[25px] [&::-webkit-scrollbar]:rounded-[10px] ${app}`}
    >
      <div className="market-panel p-6 [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-track]:border-[12px] [&::-webkit-scrollbar-track]:border-solid [&::-webkit-scrollbar-track]:border-white [&::-webkit-scrollbar-track]:bg-[#ccc] [&::-webkit-scrollbar-thumb]:w-[25px] [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:border-0 [&::-webkit-scrollbar-thumb]:border-x-[9px] [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-white [&::-webkit-scrollbar-thumb]:bg-app-base">
        <div className="checkout-title">
          <span>محصولات‌من</span>
          <small className="text-[13px] font-semibold text-gray">{count} عدد کالا</small>
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
            <a
              href={appLink}
              className="mt-5 inline-block cursor-pointer rounded-lg bg-button-bg px-3 py-[10px] text-[13px] font-semibold !text-white"
            >
              مشاهده محصولات
            </a>
          )}
        </div>
      </div>

      <div className="mt-10">
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
