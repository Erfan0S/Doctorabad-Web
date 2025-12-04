"use client";
import style from "./paymentMethods.module.scss";
import checkoutStyle from "../chekcout.module.scss";
import {
  CartPayInfo,
  PaymentMethodType,
  PaymentProviders,
} from "../../types/cart";
import PaymentMethodItem from "./PaymentMethodItem";
// @ts-ignore
import sepImage from "@repo/shared_modules/images/sep.png";
// @ts-ignore
import snappayImage from "@repo/shared_modules/images/snapppay.png";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCart } from "@repo/core/states/cart";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import { ShippingMethod } from "@repo/core/types/cart";
import { toast } from "react-toastify";
import { calcPriceToPay } from "../../utils/calcPriceToPay";
import { SnapPayIcon } from "../../../assets";

type Props = {
  payInfo: CartPayInfo;
  setPayInfo: Dispatch<SetStateAction<CartPayInfo>>;
  shippingMethod?: ShippingMethod;
};

function PaymentMethods({ payInfo, setPayInfo, shippingMethod }: Props) {
  const { data: cartData, price_paid, user_credit } = useCart();
  const installmentCartItems = cartData.filter(
    (item) => item.installment_payment
  );
  const [providerLoading, setProviderLoading] = useState(false);

  const priceToPay = calcPriceToPay(
    price_paid,
    payInfo,
    shippingMethod?.price,
    user_credit
  );
  const activeSnappay = !!installmentCartItems.length && priceToPay >= 4000;

  const {
    data: installmentEligible,
    isLoading: installmentLoading,
    refetch: installmentRefetch,
  } = useQuery({
    queryKey: ["installment_eligible", priceToPay],
    queryFn: () =>
      api.isEligibleForProvider(priceToPay, PaymentProviders.SNAPP_PAY),
    enabled: false,
    retry: 0,
    staleTime: Infinity,
  });

  const PaymentMethidsConfig: PaymentMethodType[] = [
    {
      id: PaymentProviders.CASH,
      title: "پرداخت نقدی",
      description: "پرداخت با کلیه کارت‌های متصل به شبکه شتاب",
      pic_url: sepImage,
    },
    {
      id: PaymentProviders.SNAPP_PAY,
      title: "پرداخت اقساطی اسنپ‌پی",
      description:
        "پرداخت اقساطی اسنپ‌پی" +
        (priceToPay >= 4000
          ? `\n4 قسط ماهیانه ${priceFormatter(priceToPay / 4)}تومان\n(بدون کارمزد)`
          : ""),
      icon: <SnapPayIcon />,
      more_info_url: "https://doctorabad.com/mag/snapppay",
      disabled: !activeSnappay,
      async onClick() {
        setProviderLoading(true);
        const isEligible = await installmentRefetch();
        setProviderLoading(false);
        if (isEligible?.data?.data.data.response.eligible) {
          setPayInfo((prev) => ({
            ...prev,
            paymentMethod: PaymentProviders.SNAPP_PAY,
          }));
        } else if (isEligible?.data?.data.data.response.description) {
          toast.error(isEligible?.data?.data.data.response.description);
        }
      },
      isLoading: installmentLoading || providerLoading,
    },
  ];

  useEffect(() => {
    if (!activeSnappay) {
      setPayInfo((prev) => ({ ...prev, paymentMethod: PaymentProviders.CASH }));
    }
  }, [activeSnappay]);

  return (
    <div className={`${style.paymentMethodsWrapper}`}>
      <div className={checkoutStyle.title}>
        <span>روش پرداخت من</span>
      </div>
      <div className={style.paymentMethodsList}>
        {PaymentMethidsConfig.map((item) => (
          <PaymentMethodItem
            key={item.id}
            payemtMethod={item}
            active={payInfo.paymentMethod === item.id}
            onClick={() =>
              item.onClick
                ? item.onClick()
                : setPayInfo((prev) => ({ ...prev, paymentMethod: item.id }))
            }
            disabled={item.disabled}
            isLoading={item.isLoading}
          />
        ))}
      </div>
    </div>
  );
}

export default PaymentMethods;
