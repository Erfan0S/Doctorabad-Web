import Image from "next/image";
import Link from "next/link";
import style from "./CartItem.module.scss";
import { priceFormatter } from "@repo/core/utils";
import RecycleBin from "../../../../assets/svg/recycleBin";
import { calcDiscountPercentage } from "../../../utils/calcDiscountPercentage";
import { cartActions } from "../../../states/cart";
import { placeHolderDataUrl } from "@repo/core/constants";
import { Order } from "@repo/core/types";
import { generateSingleProductUrlFromId } from "../../../utils/UrlUtils";
import React from "react";

const CartItem = ({
  id,
  price_main,
  price_off,
  product_pic,
  product_title,
  quantity,
  product_id,
  price_amazing,
  variants,
}: Order) => {
  const onDecrease = () => {
    quantity > 1
      ? cartActions.decreaseQuantity(id)
      : cartActions.removeFromCart(id);
  };

  const onIncrease = () => {
    cartActions.increaseQuantity(id);
  };

  const url = generateSingleProductUrlFromId(product_id);

  return (
    <div className={style.cartItem}>
      <div className={style.cartItemImage}>
        <Link href={url}>
          <Image
            src={product_pic || placeHolderDataUrl}
            alt={product_title}
            width={75}
            height={75}
          />
        </Link>
      </div>
      <div className={style.cartItemContent}>
        <div className={style.cartItemTitle}>
          <Link href={url}>{product_title}</Link>
        </div>
        <div className={style.cartItemFooter}>
          <div className={style.cartItemPrice}>
            {(!!price_off || price_amazing) && (
              <div className="off-price-wrapper">
                <small>
                  ٪
                  {calcDiscountPercentage(
                    price_main,
                    price_amazing || price_off
                  )}
                </small>
                <span>
                  {priceFormatter(price_main)}
                  <small>تومن</small>
                </span>
              </div>
            )}
            <div>
              {priceFormatter(price_amazing || price_off || price_main)}
              <small>تومن</small>
            </div>
          </div>
          <div className={style.cartItemButton}>
            <button onClick={onDecrease}>
              {quantity > 1 ? "-" : <RecycleBin height={20} width={20} />}
            </button>
            <span>{quantity}</span>
            <button onClick={onIncrease}>+</button>
          </div>
        </div>
      </div>
      {variants ? (
        <div className={style.cartItemVariants}>
          {variants.map((variant) => (
            <span key={variant.product_variant_id}>
              {variant.option_title}
              {!variant.check_box ? ": " + variant.option_value : null}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CartItem;
