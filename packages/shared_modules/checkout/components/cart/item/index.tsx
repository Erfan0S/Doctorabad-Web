"use client";
import Image from "next/image";
import style from "./CartItem.module.scss";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import RecycleBin from "../../../../assets/svg/recycleBin";
import { calcDiscountPercentage } from "../../../utils/calcDiscountPercentage";
import { cartActions } from "@repo/core/states/cart";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { Order, OrderType } from "@repo/core/types/cart";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
// @ts-ignore
import snappayImage from "@repo/shared_modules/images/snapppay_2.png";
import { Loading, QuantityProductButton } from "../../../../common/components";
import { useCartActionsLoadingHandler } from "@repo/core/hooks/useCartActionsLoadingHandler";
import { Apps } from "@repo/core/types/general";

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
  product_type,
  installment_payment,
}: Order) => {
  const url = generateSingleProductUrlFromId(product_id, "", product_type);

  const canIncrease = product_type === OrderType.ShopProduct;
  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();

  return (
    <div className={style.cartItem}>
      {installment_payment && (
        <div className={style.cartItemInstallmentProvider}>
          <Image src={snappayImage} alt="اسنپ پی" width={33} height={20} />
        </div>
      )}
      <div className={style.cartItemImage}>
        <a href={url} target="_blank">
          <Image
            src={product_pic || placeHolderDataUrl}
            alt={product_title}
            width={75}
            height={75}
          />
        </a>
      </div>
      <div className={style.cartItemContent}>
        <div className={style.cartItemTitle}>
          <a href={url} target="_blank">
            {product_title}
          </a>
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
          {canIncrease ? (
            <QuantityProductButton
              cardActionsLoadingHandler={cartActionsLoadingHandler}
              isLoadibg={updateCartLoading}
              id={id}
              quantity={quantity}
              className={style.cartItemButton}
              app={Apps.BASE}
            />
          ) : (
            <div className={style.cartItemButton}>
              <button
                onClick={cartActionsLoadingHandler(() =>
                  cartActions.removeFromCart(id)
                )}
              >
                {updateCartLoading ? (
                  <Loading size={15} app={Apps.BASE} />
                ) : (
                  <RecycleBin height={20} width={20} />
                )}
              </button>
            </div>
          )}
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
    </div>
  );
};

export default CartItem;
