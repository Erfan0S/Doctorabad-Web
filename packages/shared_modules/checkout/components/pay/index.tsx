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
import { ShippingMethod } from "@repo/core/types/cart";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import Loading from "../../../common/components/loading";
import { toast } from "react-toastify";
import OptionSwitch from "../../../common/components/optionSwitch";
import { CartPayInfo } from "../../types/cart";

type Props = {
  shippingMethod: ShippingMethod | undefined;
  payInfo: CartPayInfo;
  setPayInfo: Dispatch<SetStateAction<CartPayInfo>>;
};

const Pay = ({
  shippingMethod,
  payInfo: { description, discountCode, payWithCredit },
  setPayInfo,
}: Props) => {
  const { coins, my_profit, count, user_credit, price_paid } = useCart();

  const {
    refetch,
    data: discountInfo,
    isLoading: discountLoading,
  } = useQuery({
    queryKey: ["discount", discountCode],
    queryFn: () => {
      return api.checkDiscountCode(discountCode).then((res) => {
        toast("کد تخفیف اعمال شد", { type: "success", position: "top-left" });
        return res;
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
    setPayInfo((prev) => ({ ...prev, discountInfo: discountInfo?.data }));
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

  const finalPrice =
    (shippingMethod?.price || 0) +
    (discountInfo?.data.price_paid || price_paid);

  return (
    <div className={style.pay}>
      <div className={style.payTitle}>
        <span>صورتحساب من</span>
      </div>
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
      <div className={style.payOptions}>
        <ul>
          <OptionSwitch
            title="توضیحات سفارش"
            activeSwitchComponent={descriptionInput}
            name="description"
            onToggle={(state) => {
              state || setPayInfo((prev) => ({ ...prev, description: "" }));
            }}
          />
          <OptionSwitch
            title="کد تخفیف دارم"
            activeSwitchComponent={discountInput}
            name="discount"
            onToggle={(state) => {
              state || setPayInfo((prev) => ({ ...prev, discountCode: "" }));
            }}
          />
          {!!user_credit && (
            <OptionSwitch
              title="استفاده از اعتبار"
              name="credit"
              onToggle={(isChecked) =>
                setPayInfo((prev) => ({ ...prev, payWithCredit: isChecked }))
              }
            />
          )}
        </ul>
      </div>
      {payWithCredit && (
        <>
          <div className={style.paySumPrice}>
            <span style={{ textDecoration: "line-through", color: "#000" }}>
              {priceFormatter(price_paid)} تومن
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
            Math.max(finalPrice - (payWithCredit ? user_credit : 0), 0)
          )}{" "}
          تومن
        </span>
      </div>
    </div>
  );
};

export default Pay;
