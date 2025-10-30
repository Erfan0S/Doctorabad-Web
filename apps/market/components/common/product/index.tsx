"use client";
import Image from "next/image";
import style from "./Product.module.scss";
import { ProductCard, ProductListType } from "@repo/core/types/product";
import Link from "next/link";

import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { priceFormatter } from "@repo/core/utils/priceFormatter";

import { calcDiscountPercentage } from "@repo/core/utils/calcDiscountPercentage";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
import FavoriteIcon from "../favoriteIcon";
import { cartActions, useCart } from "@repo/core/states/cart";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import Loading from "../loading";
import { useToggleFavoriteProduct } from "@/hooks/useToggleFavoriteProduct";
import { useCartActionsLoadingHandler } from "@repo/core/hooks/useCartActionsLoadingHandler";

import { useRestockNotification } from "@/hooks/useRestockNotification";
import { FavoriteColors } from "@/components/marketHome/intro/orderInformation/enum";
import { OrderType } from "@repo/core/types/cart";
import {
  ListProductSnappayNotif,
  QuantityProductButton,
} from "@repo/shared_modules/components";

const Product: React.FC<ProductCard> = ({
  title,
  id,
  user_favorite,
  price_main,
  price_off,
  product_pic,
  quantity,
  price_amazing,
  slug,
  gridView = undefined,
  lazyLoadImage = true,
  has_variant = false,
  installment_payment = false,
}) => {
  const { isFavorite, isLoading, toggleFavorite } =
    useToggleFavoriteProduct(!!user_favorite);

  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();

  const { data } = useCart();

  const { restockNotification, restockNotificationLoading } =
    useRestockNotification(id);

  const productOrder = data.find(
    (order) =>
      order.product_id === id && order.product_type === OrderType.ShopProduct
  );

  const url = generateSingleProductUrlFromId(id, slug);

  const isProductHasStock = quantity !== 0;

  return (
    <div className={`${style.product} ${gridView ? style.gridView : ""}`}>
      <div className={style.productImage}>
        {installment_payment && (
          <ListProductSnappayNotif className={style.installmentPayment} />
        )}
        <Link href={url}>
          <Image
            loading={lazyLoadImage ? "lazy" : "eager"}
            fill
            src={product_pic || placeHolderDataUrl}
            alt={title}
            placeholder={placeHolderDataUrl}
          />
        </Link>
      </div>
      <div className={style.productContent}>
        <div className={style.productTitle}>
          <h2>
            <Link href={url}>{title}</Link>
          </h2>
        </div>
        {isProductHasStock && (
          <div className={style.productPrice}>
            <div className={style.productPriceRegular}>
              {(!!price_off || !!price_amazing) && (
                <>
                  <span>{priceFormatter(price_main)} تومن</span>
                  <small>
                    %
                    {calcDiscountPercentage(
                      price_main,
                      price_amazing || price_off
                    )}
                  </small>{" "}
                </>
              )}
            </div>
            <span className={style.productPriceSale}>
              {priceFormatter(price_amazing || price_off || price_main)} تومن
            </span>
          </div>
        )}
        <div className={style.productButtons}>
          <>
            {productOrder && !has_variant ? (
              <QuantityProductButton
                id={productOrder.id}
                quantity={productOrder.quantity}
                cardActionsLoadingHandler={cartActionsLoadingHandler}
                isLoadibg={updateCartLoading}
                className={`${style.productAddToCart} ${style.productQuantityButton}`}
              />
            ) : isProductHasStock ? (
              has_variant ? (
                <Link
                  className={style.productAddToCart}
                  href={"/market/product/" + id}
                >
                  انتخاب گزینه‌های خرید
                </Link>
              ) : (
                <button
                  className={style.productAddToCart}
                  onClick={authorizeClientAction(
                    cartActionsLoadingHandler(() => cartActions.addToCart(id))
                  )}
                >
                  {updateCartLoading ? <Loading size={22} /> : "افزودن‌به‌سبد"}
                </button>
              )
            ) : (
              <button
                className={style.productNoStock}
                onClick={restockNotification}
                disabled={restockNotificationLoading}
              >
                {restockNotificationLoading ? (
                  <Loading size={22} />
                ) : (
                  "موجود شد خبرم کن!"
                )}
              </button>
            )}
            <button
              aria-label="AddToFavorite"
              className={style.productAddToFavorite}
            >
              <FavoriteIcon
                isFavorite={isFavorite}
                loading={isLoading}
                onClick={() => toggleFavorite(id)}
                size={24}
                color={FavoriteColors.ORANGE}
              />
            </button>
          </>
        </div>
      </div>
    </div>
  );
};
export default Product;
