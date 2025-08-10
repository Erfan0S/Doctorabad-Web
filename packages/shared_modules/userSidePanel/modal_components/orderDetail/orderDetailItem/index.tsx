"use client";
import Image from "next/image";
import style from "./OrderDetailItem.module.scss";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { calcDiscountPercentage } from "@repo/core/utils/calcDiscountPercentage";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { Order, OrderType } from "@repo/core/types/cart";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
import { modalActions } from "@repo/core/modal/modals";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { OrderDetailItemType } from "../../../../checkout/types/orders";

const OrderDetailItem = ({
  id,
  pic_url,
  price,
  product_type,
  quantity,
  title,
}: OrderDetailItemType) => {
  const { replace } = useRouter();

  const url = generateSingleProductUrlFromId(id, "", product_type);
  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    modalActions.clearModals();
    window.open(url);
  };
  return (
    <div className={style.OrderDetailItem}>
      <div className={style.OrderDetailItemImage}>
        <a href={url} target="_blank" onClick={navigate}>
          <Image
            src={pic_url || placeHolderDataUrl}
            alt={title}
            width={75}
            height={75}
          />
        </a>
      </div>
      <div className={style.OrderDetailItemContent}>
        <div className={style.OrderDetailItemTitle}>
          <a onClick={navigate} href={url}>
            {title}
          </a>
        </div>
        <div className={style.OrderDetailItemFooter}>
          <div className={style.OrderDetailItemPrice}>
            {/* {!!price_off && (
              <div className="off-price-wrapper">
                <small>٪{calcDiscountPercentage(price_main, price_off)}</small>
                <span>
                  {priceFormatter(price_main)}
                  <small>تومن</small>
                </span>
              </div>
            )} */}
            <div>
              {priceFormatter(price)}
              <small>تومن</small>
            </div>
          </div>
          <span className={style.OrderDetailItemFooterQuantity}>
            x {quantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailItem;
