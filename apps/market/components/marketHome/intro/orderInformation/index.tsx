"use client";

import Image from "next/image";
import clubImage from "@/assets/img/club.png";
import coinIcon from "@/assets/img/coin.png";
import { LastProcessingOrder } from "@/types/orders";
import { toFullPersianDateString } from "@repo/core/utils/toFullPersianDateString";
import { ORDER_STATUS } from "./enum";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import Group from "@/assets/svg/group";
import BagTick from "@/assets/svg/bagTick";
import BoxTick from "@/assets/svg/boxTick";
import Box from "@/assets/svg/box";
import Card from "@/assets/svg/card";
import { useEffect } from "react";
import { useCart } from "@repo/core/states/cart";
import { useClientComponentInitiated } from "@repo/core/hooks/useClientComponentInitiated";
import { useRouter } from "next/navigation";
import getCheckoutUrl from "@repo/core/utils/getCheckoutUrl";

type Props = {
  order: LastProcessingOrder;
};

const STEP =
  "relative flex items-center flex-[0_1_100%] last:flex-[0_1_20px] text-[#f7d985] before:absolute before:content-[''] before:left-[5px] before:right-[25px] before:top-1/2 before:border-t before:border-solid last:before:content-none";
const STEP_ON =
  "before:border-orange [&_svg]:text-white [&_svg]:relative [&_svg]:z-10 after:content-[''] after:absolute after:w-[26px] after:h-[26px] after:bg-orange after:rounded-md after:right-[-3px] after:top-[-3px]";
const STEP_OFF = "before:border-[#f7d985]";

const OrderInformation: React.FC<Props> = ({ order }) => {
  const isInitiated = useClientComponentInitiated();
  const cart = useCart();
  const { refresh, push } = useRouter();

  const orderStatus = order.order_shipping.status;

  useEffect(() => {
    if (isInitiated) {
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const isOrderNotPurchaseYet = orderStatus === ORDER_STATUS.NEW;

  const onClickAction = () => {
    if (isOrderNotPurchaseYet) {
      window.open(getCheckoutUrl(true), "_self");
    } else {
      modalActions.addModal(ModalTypes.ORDER_DETAIL, {
        orderCode: order.data.order_code,
      });
    }
  };

  const stepClass = (step: number) =>
    `${STEP} ${orderStatus >= step ? STEP_ON : STEP_OFF}`;

  return (
    <div className="border-2 border-solid border-orange rounded-[20px] px-3 py-4 h-full flex flex-col justify-center max-lg:mt-7 max-lg:h-auto">
      <div className="flex justify-between mb-5">
        <span className="text-base leading-[35px] font-bold">سفارش من</span>
        <span
          onClick={onClickAction}
          className="text-sm leading-[35px] font-bold px-5 text-white bg-orange rounded-lg cursor-pointer"
        >
          {isOrderNotPurchaseYet ? "تکمیل خرید" : "جزئیات سفارش"}
        </span>
      </div>
      <div>
        <p className="text-[13px] mb-0">{toFullPersianDateString(order.data.created_at)}</p>
        <p className="text-[13px] mb-4">
          شماره سفارش : <b>{order.data.order_code}</b>
        </p>
        <ul className="flex items-center list-none p-0">
          <li className={stepClass(ORDER_STATUS.NEW)}>
            <Card height={20} width={20} />
          </li>
          <li className={stepClass(ORDER_STATUS.PREPARING)}>
            <BagTick height={20} width={20} />
          </li>
          <li className={stepClass(ORDER_STATUS.LEAVING_WAREHOUSE)}>
            <Box height={20} width={20} />
          </li>
          <li className={stepClass(ORDER_STATUS.POSTED)}>
            <Group height={20} width={20} />
          </li>
          <li className={stepClass(ORDER_STATUS.DELIVERED)}>
            <BoxTick height={20} width={20} />
          </li>
        </ul>
      </div>
      <div className="flex mb-6">
        <span className="text-[13px] leading-[30px] me-[15px] max-sm:text-xs max-sm:me-2">آخرین‌وضعیت:</span>
        <span className="text-[13px] leading-[30px] block bg-[#f7d985] text-center font-bold rounded-lg cursor-pointer grow-[2] px-2 max-sm:text-xs">
          {order.order_shipping.last_text_status}
        </span>
      </div>
      {Boolean(order.coin_received || order.discount_code) && (
        <div className="flex flex-col items-center">
          <Image
            src={clubImage}
            alt="Club"
            className="max-w-[125px] h-[86px] mb-2"
          />
          {order.coin_received && (
            <p className="m-0 text-[13px] font-medium leading-[13px]" style={{ margin: "5px 0 10px" }}>
              با این سفارش {order.coin_received}{" "}
              <Image width={20} height={20} src={coinIcon} alt="coin" /> گرفتین!
            </p>
          )}
          {order.discount_code && (
            <p>کد تخفیف برای سفارش بعدیتون : {order.discount_code}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderInformation;
