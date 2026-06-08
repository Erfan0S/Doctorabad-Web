"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
// @ts-ignore
import clubImage from "../../../assets/img/club.png";
// @ts-ignore
import coinIcon from "../../../assets/img/coin.png";
import style from "./Pay.module.scss";
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
    <div className={style.payDiscount}>
      <input
        type="text"
        placeholder="کد تخفیف"
        value={discountCode}
        onChange={(e) =>
          setPayInfo((prev) => ({ ...prev, discountCode: e.target.value }))
        }
      />
      {discountLoading && (
        <span className={style.payDiscountLoader}>
          <Loading size={15} />
        </span>
      )}
      {/* <button onClick={onCheckDiscountCode} disabled={discountLoading || !discountCode}>
        {discountLoading ? <Loading size={5} /> : 'ثبت'}
      </button> */}
    </div>
  );

  const descriptionInput = (
    <div className={style.payDiscount}>
      <textarea
        placeholder="هر توضیحی درباره این سفارش دارین اینجا بنویسین..."
        value={description}
        onChange={(e) =>
          setPayInfo((prev) => ({ ...prev, description: e.target.value }))
        }
      />
    </div>
  );

  useEffect(() => {
    if (discountCode.length === 5) onCheckDiscountCode();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountCode]);

  return (
    <div className={`${style.pay} ${drProMode ? style.pro : ""}`}>
      <div className={style.payTitle}>
        <span>صورتحساب من</span>
      </div>
      {!drProMode && (
        <>
          <div className={style.payClub}>
            <Image src={clubImage} alt="Club" />
            <p>
              با تکمیل این سفارش {coins}{" "}
              <Image width={20} height={20} src={coinIcon} alt="coin" /> میگیرم!
            </p>
          </div>
          <div className={style.payDetail}>
            <ul>
              {shippingMethod &&
                (!!shippingMethod.price || !!shippingMethod.price_text) &&
                Number(count) > 0 && (
                  <li>
                    <span>هزینه ارسال:</span>
                    {shippingMethod.price > 0 ? (
                      <span>
                        {priceFormatter(shippingMethod.price)}
                        <small>تومن</small>
                      </span>
                    ) : (
                      <span className={style.priceText}>
                        {shippingMethod.price_text}
                      </span>
                    )}
                  </li>
                )}
              <li>
                <span>مجموع:</span>
                <span>
                  {priceFormatter(price_paid)}
                  <small>تومن</small>
                </span>
              </li>
              <li>
                <span>سود من:</span>
                <span>
                  {priceFormatter(my_profit)}
                  <small>تومن</small>
                </span>
              </li>
            </ul>
          </div>
        </>
      )}
      <div className={style.payOptions}>
        <ul>
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
          <div className={style.paySumPrice}>
            <span style={{ textDecoration: "line-through", color: "#000" }}>
              {priceFormatter(
                calcPriceToPay(price_paid, payInfo, shippingMethod?.price, 0),
              )}{" "}
              تومن
            </span>
          </div>
          {/* <div className={style.paySumPrice}>
            <span>پرداخت با اعتبار : {priceFormatter(Math.min(user_credit, finalPrice))} تومن</span>
          </div> */}
          <div className={style.paySumPrice}>
            <span>اعتبار من : {priceFormatter(user_credit)} تومن</span>
          </div>
        </>
      )}
      <div className={style.paySumPrice}>
        <span>
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
