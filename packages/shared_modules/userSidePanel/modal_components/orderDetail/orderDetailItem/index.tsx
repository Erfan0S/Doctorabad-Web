"use client";
import Image from "next/image";
import style from "./OrderDetailItem.module.scss";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import { calcDiscountPercentage } from "@repo/core/utils/calcDiscountPercentage";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { Order, OrderType } from "@repo/core/types/cart";
import { generateSingleProductUrlFromId, generateInsuranceSlug } from "@repo/core/utils/UrlUtils";
import { modalActions } from "@repo/core/modal/modals";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { OrderDetailItemType } from "../../../../checkout/types/orders";
import { CoinIcon } from "../../../../assets";
import PaperIcon from "../../../../assets/svg/paper";

const OrderDetailItem = ({
  id,
  pic_url,
  price,
  product_type,
  quantity,
  title,
  price_main,
  draft,
}: OrderDetailItemType) => {
  const { replace } = useRouter();

  const getSlug = () => {
    if (product_type === OrderType.Insurance) {
      return generateInsuranceSlug({
        product_id: id,
        product_title: title,
        product_pic: pic_url || "",
        price_off: price,
        price_main: price_main || price,
        draft: draft,
      });
    }
    return "";
  };

  const url = generateSingleProductUrlFromId(id, getSlug(), product_type);
  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    modalActions.clearModals();
    window.open(url);
  }; 
  return (
    <div className={style.OrderDetailItem}>
      <a href={url} target="_blank" onClick={navigate}>
        <div className={style.OrderDetailItemImage}>
          <Image
            src={pic_url || placeHolderDataUrl}
            alt={title}
            width={75}
            height={75}
          />
        </div>
        <div className={style.OrderDetailItemContent}>
          <div className={style.OrderDetailItemTitle}>{title}</div>
          <div className={style.OrderDetailItemFooter}>
            <span className={style.OrderDetailItemFooterInfo}>
              <CoinIcon />
              {priceFormatter(price)}
              <small>تومن</small>
            </span>
            <span className={style.OrderDetailItemFooterInfo}>
              <PaperIcon />
              {quantity} <small>عدد</small>
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default OrderDetailItem;
