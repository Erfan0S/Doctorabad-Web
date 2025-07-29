"use client";

import Image from "next/image";
import style from "./OrderInformation.module.scss";
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
import { routePath } from "@repo/core/constants/routePath";

const OrderInformation: React.FC<{ order: LastProcessingOrder }> = ({
  order,
}) => {
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
      push(routePath.checkout);
    } else {
      modalActions.addModal(ModalTypes.ORDER_DETAIL, {
        orderCode: order.data.order_code,
      });
    }
  };

  return (
    <div className={style.orderInformation}>
      <div className={style.orderInformationTitle}>
        <span>سفارش من</span>
        <span onClick={onClickAction}>
          {isOrderNotPurchaseYet ? "تکمیل خرید" : "جزئیات سفارش"}
        </span>
      </div>
      <div className={style.orderInformationBody}>
        <p>{toFullPersianDateString(order.data.created_at)}</p>
        <p>
          شماره سفارش : <b>{order.data.order_code}</b>
        </p>
        <ul>
          <li className={orderStatus >= ORDER_STATUS.NEW ? style.active : ""}>
            <Card height={20} width={20} />
          </li>
          <li
            className={
              orderStatus >= ORDER_STATUS.PREPARING ? style.active : ""
            }
          >
            <BagTick height={20} width={20} />
          </li>
          <li
            className={
              orderStatus >= ORDER_STATUS.LEAVING_WAREHOUSE ? style.active : ""
            }
          >
            <Box height={20} width={20} />
          </li>
          <li
            className={orderStatus >= ORDER_STATUS.POSTED ? style.active : ""}
          >
            <Group height={20} width={20} />
          </li>
          <li
            className={
              orderStatus >= ORDER_STATUS.DELIVERED ? style.active : ""
            }
          >
            <BoxTick height={20} width={20} />
          </li>
        </ul>
      </div>
      <div className={style.orderInformationStatus}>
        <span>آخرین‌وضعیت:</span>
        <span>{order.order_shipping.last_text_status}</span>
      </div>
      {Boolean(order.coin_received || order.discount_code) && (
        <div className={style.orderInformationFooter}>
          <Image src={clubImage} alt="Club" />
          {order.coin_received && (
            <p style={{ margin: "5px 0 10px" }}>
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
