"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import clubImage from "../../../assets/img/club.png";
import coinIcon from "../../../assets/img/coin.png";
import style from "./Pay.module.scss";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { cartActions, useCart } from "@repo/core/states/cart";
import {
  CreateOrderRequest,
  ShippingAddress,
  ShippingMethod,
} from "@repo/core/types/cart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import Loading from "../../../common/components/loading";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { routePath } from "@repo/core/constants/routePath";
import OptionSwitch from "../../../common/components/optionSwithch";

type Props = {
  shippingMethod: ShippingMethod | undefined;
  currentAddress: ShippingAddress | undefined;
  hasPhysicalProduct: boolean;
};

const Pay = ({ shippingMethod, currentAddress, hasPhysicalProduct }: Props) => {
  const { replace } = useRouter();

  const { coins, my_profit, count, user_credit, price_paid } = useCart();

  const [discountCode, setDiscountCode] = useState("");
  const [description, setDescription] = useState("");

  const [payWithCredit, setPayWithCredit] = useState(false);

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

  const createOrder = useMutation({
    mutationFn: (data: CreateOrderRequest) => api.createOrder(data),
    retry: 0,
    onSuccess: (data) => {
      if (data.data.data.identifier) {
        cartActions.getCartData();
        replace(
          `${routePath.callback}?identifier=${data.data.data.identifier}`
        );
      }

      const { message, url } = data.data.data!;

      toast(message, { type: "success", position: "top-left" });
      window.open(url, "_self");
    },
    onError: (error: any) => {
      if (error?.status === 422) {
        cartActions.getCartData();
      }
    },
  });

  const onCheckDiscountCode = () => {
    if (discountCode.length) {
      refetch();
    }
  };

  const onCreateOrder = () => {
    if (!count)
      return toast("سبدخرید خالی است", { type: "error", position: "top-left" });
    if (!shippingMethod && hasPhysicalProduct)
      return toast("ابتدا نوع تحویل محصول را انتخاب کنید", {
        type: "error",
        position: "top-left",
      });

    const request: CreateOrderRequest = {
      use_credit: payWithCredit,
      discount_code_id: discountInfo?.data?.discount_code_id || null,
      description: description,
    };
    if (hasPhysicalProduct) {
      request.shipping_method_id = shippingMethod!.id;
      request.address_id = currentAddress!.id;
    }
    createOrder.mutate(request);
  };

  const discountInput = (
    <div className={style.payDiscount}>
      <input
        type="text"
        placeholder="کد تخفیف"
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
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
        onChange={(e) => setDescription(e.target.value)}
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
          {shippingMethod && !!shippingMethod.price && Number(count) > 0 && (
            <li>
              <span>هزینه ارسال:</span>
              <span>
                {priceFormatter(shippingMethod.price)}
                <small>تومن</small>
              </span>
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
            id="description"
            onToggle={(state) => {
              state || setDescription("");
            }}
          />
          <OptionSwitch
            title="کد تخفیف دارم"
            activeSwitchComponent={discountInput}
            id="discount"
            onToggle={(state) => {
              state || setDiscountCode("");
            }}
          />
          {!!user_credit && (
            <OptionSwitch
              title="استفاده از اعتبار"
              id="credit"
              onToggle={(isChecked) => setPayWithCredit((prev) => isChecked)}
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
      <div className={style.payButton}>
        <button disabled={createOrder.isPending} onClick={onCreateOrder}>
          {createOrder.isPending ? (
            <Loading size={25} />
          ) : (
            "پرداخت و نهایی کردن سفارش"
          )}
        </button>
      </div>
    </div>
  );
};

export default Pay;
