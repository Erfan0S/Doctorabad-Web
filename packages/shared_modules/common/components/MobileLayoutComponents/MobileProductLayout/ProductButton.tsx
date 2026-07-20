"use client";
import { OrderType } from "@repo/core/types/cart";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import {
  AddToCartButton,
  ProductSnappayNotif,
} from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
import { getDiscountInformation } from "@repo/core/utils/getDiscountInformation";
import AmazingStarIcon from "../../../../assets/svg/amazingStart";

export type ProductButtonProps = {
  mainPrice: number;
  offPrice?: number | null;
  amazingPrice?: number | null;
  replaceButton?: React.ReactNode;
  children?: React.ReactNode;
  installment_payment?: boolean;
  installment_text?: string;
  orderType: OrderType;
  productId: number;
  app?: Apps;
  canIncrease?: boolean;
  compact?: boolean;
  text?: string;
  onClick?: () => void;
};

export default function ProductButton({
  mainPrice,
  offPrice,
  amazingPrice,
  replaceButton,
  children,
  installment_payment,
  installment_text,
  app,
  productId,
  orderType,
  canIncrease = false,
  compact,
  onClick,
  text,
}: ProductButtonProps) {
  const { discountPercent } = getDiscountInformation(
    mainPrice,
    offPrice || undefined,
    amazingPrice || undefined,
  );

  const isFree = !mainPrice && !offPrice;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[100] mx-auto flex w-full max-w-[800px] flex-col items-center bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] [&_:focus]:text-white max-[425px]:[&_button]:text-[14px]`}
    >
      {installment_payment && installment_text && (
        <ProductSnappayNotif text={installment_text} className="!mb-0" />
      )}
      <div className={`flex w-full flex-row items-center px-[15px] py-[10px]`}>
        {replaceButton ? (
          replaceButton
        ) : (
          <AddToCartButton
            id={+productId}
            type={orderType}
            app={app}
            isFullWidth
            className={`relative [&>button]:bg-button-bg ${!!offPrice && "leading-[17px] [&>button]:p-[7px]"}`}
            canIncrease={canIncrease}
            compact={compact}
            onClick={onClick}
          >
            <span className="!flex flex-col">
              {isFree ? (
                <span>رایگان</span>
              ) : (
                <>
                  <span>
                    {!!discountPercent && (
                      <span className="absolute end-[10px] top-0 -translate-y-1/2 rounded-[50px] p-[8px] text-black">
                        <span className="relative block w-[40px] max-[425px]:w-[30px] [&_svg]:absolute [&_svg]:start-0 [&_svg]:top-0 [&_svg]:z-[-1] [&_svg]:h-[40px] [&_svg]:w-[40px] [&_svg]:translate-y-[-20%] [&_svg]:text-[orange] max-[425px]:[&_svg]:h-[30px] max-[425px]:[&_svg]:w-[30px]">
                          <AmazingStarIcon />
                          <span className="inline-block w-full text-center text-[12px] max-[425px]:text-[10px]">
                            %{discountPercent}
                          </span>
                        </span>
                      </span>
                    )}{" "}
                    {offPrice && (
                      <span className="line-through">
                        {priceFormatter(mainPrice)}
                        تومن
                      </span>
                    )}
                  </span>
                  <span>
                    {priceFormatter(offPrice || mainPrice)}
                    تومن
                  </span>
                </>
              )}
            </span>{" "}
            <span>
              &nbsp;&nbsp;|&nbsp;&nbsp;{text ? text : "افزودن به سبد خرید"}
            </span>
          </AddToCartButton>
        )}
        {children && children}
      </div>
    </div>
  );
}
