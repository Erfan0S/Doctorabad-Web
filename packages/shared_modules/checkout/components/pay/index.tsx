"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
// @ts-ignore
import clubImage from "../../../assets/img/club.png";
// @ts-ignore
import coinIcon from "../../../assets/img/coin.png";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { useCart } from "@repo/core/states/cart";
import { ShippingMethod, DiscountInfo } from "@repo/core/types/cart";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { ResponseType } from "@repo/core/types/general";
import Loading from "../../../common/components/loading";
import { toast } from "react-toastify";
import OptionSwitch from "../../../common/components/optionSwitch";
import { CartPayInfo } from "../../types/cart";
import { calcPriceToPay } from "../../utils/calcPriceToPay";
import { Apps } from "@repo/core/types/general";

// SCSS→Tailwind: shared classes for the two payDiscount input wrappers
const payFieldWrapperClasses = "relative mb-2 mt-2 w-full";
const paySumPriceClasses = "my-1 text-center";
const paySumPriceTextClasses = "block text-[14px] font-semibold text-app-base";

type Props = {
  shippingMethod: ShippingMethod | undefined;
  payInfo: CartPayInfo;
  setPayInfo: Dispatch<SetStateAction<CartPayInfo>>;
  children?: React.ReactNode;
  price_paid?: number;
  drProMode?: boolean;
  drProPlanId?: number | null;
};

const Pay = ({
  shippingMethod,
  payInfo,
  setPayInfo,
  children,
  price_paid: pricePaidProp,
  drProMode,
  drProPlanId,
}: Props) => {
  const {
    coins,
    my_profit,
    count,
    user_credit,
    price_paid: cartPricePaid,
  } = useCart();
  const { description, discountCode, payWithCredit } = payInfo;
  const price_paid = pricePaidProp ?? cartPricePaid;

  const {
    refetch,
    data: discountInfo,
    isLoading: discountLoading,
  } = useQuery<ResponseType<{ data: DiscountInfo }>, Error>({
    queryKey: drProMode ? ["drpro-discount", discountCode, drProPlanId] : ["discount", discountCode],
    queryFn: () => {
      if (drProMode) {
        return api.checkDrProDiscountCode({ discount_code: discountCode, plan_id: drProPlanId ?? 0 }).then((res) => {
          toast("کد تخفیف اعمال شد", { type: "success", position: "top-left" });
          const mapped: ResponseType<{ data: DiscountInfo }> = {
            // preserve outer structure minimally; cast to satisfy typing
            ...((res as unknown) as ResponseType<any>),
            data: {
              data: {
                discount_code_id: res.data.data.discount_code_id,
                price_paid: (res.data.data as any).new_price,
              },
            },
          };
          return mapped;
        });
      }
      return api.checkDiscountCode(discountCode).then((res) => {
        toast("کد تخفیف اعمال شد", { type: "success", position: "top-left" });
        return res as unknown as ResponseType<{ data: DiscountInfo }>;
      });
    },
    enabled: false,
    retry: 0,
    staleTime: Infinity,
  });

  const onCheckDiscountCode = () => {
    if (discountCode.length) {
      refetch();
    }
  };

  useEffect(() => {
    setPayInfo((prev) => ({ ...prev, discountInfo: discountInfo?.data?.data }));
  }, [discountInfo]);

  const discountInput = (
    <div className={payFieldWrapperClasses}>
      <input
        type="text"
        placeholder="کد تخفیف"
        value={discountCode}
        onChange={(e) =>
          setPayInfo((prev) => ({ ...prev, discountCode: e.target.value }))
        }
        className="block w-full rounded-lg border-2 border-solid border-gray py-0 pe-12 ps-3 leading-[36px] focus-visible:border-app-base focus-visible:outline-none"
      />
      {discountLoading && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2">
          <Loading size={15} />
        </span>
      )}
      {/* <button onClick={onCheckDiscountCode} disabled={discountLoading || !discountCode}>
        {discountLoading ? <Loading size={5} /> : 'ثبت'}
      </button> */}
    </div>
  );

  const descriptionInput = (
    <div className={payFieldWrapperClasses}>
      <textarea
        placeholder="هر توضیحی درباره این سفارش دارین اینجا بنویسین..."
        value={description}
        onChange={(e) =>
          setPayInfo((prev) => ({ ...prev, description: e.target.value }))
        }
        className="block w-full rounded-lg border-2 border-solid border-gray py-0 pe-12 ps-3 text-[11px] focus-visible:border-app-base focus-visible:outline-none"
      />
    </div>
  );

  useEffect(() => {
    if (discountCode.length === 5) onCheckDiscountCode();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountCode]);

  return (
    <div
      className={`market-panel flex h-full flex-col p-6 max-xl:h-auto ${
        drProMode ? "[--app-base:#3b9e97]" : "[--app-base:#4fcc4c]"
      }`}
    >
      <div className="checkout-title">
        <span>صورتحساب من</span>
      </div>
      {!drProMode && (
        <>
          <div className="mb-5 text-center [&_img]:mb-2 [&_img]:h-auto [&_img]:max-w-[160px]">
            <Image src={clubImage} alt="Club" />
            <p className="mb-0 font-semibold text-[#463d89]">
              با تکمیل این سفارش {coins}{" "}
              <Image width={20} height={20} src={coinIcon} alt="coin" /> میگیرم!
            </p>
          </div>
          <div className="mx-auto w-full max-w-[200px]">
            <ul className="m-0 list-none p-0">
              {shippingMethod &&
                (!!shippingMethod.price || !!shippingMethod.price_text) &&
                Number(count) > 0 && (
                  <li className="mb-1 flex items-center justify-between text-[13px] font-medium leading-[30px] text-gray">
                    <span>هزینه ارسال:</span>
                    {shippingMethod.price > 0 ? (
                      <span>
                        {priceFormatter(shippingMethod.price)}
                        <small className="ms-1">تومن</small>
                      </span>
                    ) : (
                      <span className="text-left">
                        {shippingMethod.price_text}
                      </span>
                    )}
                  </li>
                )}
              <li className="mb-1 flex items-center justify-between text-[13px] font-medium leading-[30px] text-gray">
                <span>مجموع:</span>
                <span>
                  {priceFormatter(price_paid)}
                  <small className="ms-1">تومن</small>
                </span>
              </li>
              <li className="mb-1 flex items-center justify-between text-[13px] font-medium leading-[30px] text-gray">
                <span>سود من:</span>
                <span>
                  {priceFormatter(my_profit)}
                  <small className="ms-1">تومن</small>
                </span>
              </li>
            </ul>
          </div>
        </>
      )}
      <div className="mx-auto mb-2 w-full max-w-[200px]">
        <ul className="m-0 list-none p-0">
          {!drProMode && (
            <OptionSwitch
              title="توضیحات سفارش"
              activeSwitchComponent={descriptionInput}
              name="description"
              onToggle={(state) => {
                state || setPayInfo((prev) => ({ ...prev, description: "" }));
              }}
            />
          )}
          <OptionSwitch
            title="کد تخفیف دارم"
            activeSwitchComponent={discountInput}
            name="discount"
            onToggle={(state) => {
              state || setPayInfo((prev) => ({ ...prev, discountCode: "" }));
            }}
            app={drProMode ? Apps.DRPRO : Apps.BASE}
          />
          {!!user_credit && (
            <OptionSwitch
              title="استفاده از اعتبار"
              name="credit"
              onToggle={(isChecked) =>
                setPayInfo((prev) => ({ ...prev, payWithCredit: isChecked }))
              }
              app={drProMode ? Apps.DRPRO : Apps.BASE}
            />
          )}
        </ul>
      </div>
      {payWithCredit && (
        <>
          <div className={paySumPriceClasses}>
            <span
              className={paySumPriceTextClasses}
              style={{ textDecoration: "line-through", color: "#000" }}
            >
              {priceFormatter(
                calcPriceToPay(price_paid, payInfo, shippingMethod?.price, 0),
              )}{" "}
              تومن
            </span>
          </div>
          {/* <div className={style.paySumPrice}>
            <span>پرداخت با اعتبار : {priceFormatter(Math.min(user_credit, finalPrice))} تومن</span>
          </div> */}
          <div className={paySumPriceClasses}>
            <span className={paySumPriceTextClasses}>اعتبار من : {priceFormatter(user_credit)} تومن</span>
          </div>
        </>
      )}
      <div className={paySumPriceClasses}>
        <span className={paySumPriceTextClasses}>
          قابل پرداخت:{" "}
          {priceFormatter(
            calcPriceToPay(
              price_paid,
              payInfo,
              shippingMethod?.price,
              user_credit,
            ),
          )}{" "}
          تومن
        </span>
      </div>

      {children}
    </div>
  );
};

export default Pay;
