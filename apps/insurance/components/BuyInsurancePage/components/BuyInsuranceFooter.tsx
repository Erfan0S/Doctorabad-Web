import DiscountIcon from "@/assets/svg/discount_icon";
import Loading from "@/components/common/loading";
import { AddToCartButton } from "@repo/shared_modules/components";
import { OrderType } from "@repo/core/types/cart";

const submitBtnCls =
  "flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-none text-white transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70";

interface BuyInsuranceFooterProps {
  insurerId: number | null;
  mainPrice: number;
  finalPrice: number;
  discountPercent: number;
  isLoading: boolean;
  onAddToCart: () => void;
}

export const BuyInsuranceFooter = ({
  insurerId,
  mainPrice,
  finalPrice,
  discountPercent,
  isLoading,
  onAddToCart,
}: BuyInsuranceFooterProps) => {
  const priceContent = (
    <div className="flex w-full items-center justify-between px-4 [direction:rtl]">
      <div className="flex flex-col items-end justify-center">
        {mainPrice > finalPrice && (
          <span className="mb-[2px] text-[11px] text-white/80 line-through">
            {mainPrice.toLocaleString("fa-IR")} تومان
          </span>
        )}
        <span className="text-[15px] font-bold">
          {finalPrice.toLocaleString("fa-IR")} تومان
        </span>
      </div>
      <div className="mx-[10px] h-6 w-px bg-white/40"></div>
      <span className="text-base font-bold">افزودن به سبد خرید</span>
    </div>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] mx-auto flex max-w-[800px] items-center justify-center rounded-t-[20px] bg-white px-5 py-4 shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
      {discountPercent > 0 && (
        <div className="absolute -top-[15px] left-[25px] z-[110] flex h-[50px] w-[50px] -rotate-[15deg] items-center justify-center text-base font-extrabold text-black [&_svg]:absolute [&_svg]:left-0 [&_svg]:top-0 [&_svg]:-z-[1] [&_svg]:h-full [&_svg]:w-full [&_svg]:text-[#FFC107] [&_svg]:[filter:drop-shadow(0_5px_15px_rgba(255,193,7,0.4))]">
          <DiscountIcon />
          <span className="relative z-[1] rotate-[15deg]">٪{discountPercent}</span>
        </div>
      )}

      {insurerId ? (
        <AddToCartButton
          id={insurerId}
          type={OrderType.Insurance}
          className={submitBtnCls}
          onClick={onAddToCart}
        >
          {isLoading ? <Loading size={22} /> : priceContent}
        </AddToCartButton>
      ) : (
        <button className={submitBtnCls} disabled>
          {priceContent}
        </button>
      )}
    </div>
  );
};
