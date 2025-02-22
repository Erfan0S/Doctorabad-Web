"use client";
import Image from "next/image";
import style from "./Product.module.scss";
import { ProductCard } from "@repo/core/types/product";
import Link from "next/link";

import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { priceFormatter } from "@repo/core/utils/priceFormatter";

import { calcDiscountPercentage } from "@repo/core/utils/calcDiscountPercentage";
import { generateSingleProductUrlFromId } from "@repo/core/utils/urlutils";
import FavoriteIcon from "../favoriteIcon";
import { cartActions, useCart } from "@repo/core/states/cart";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import Loading from "../loading";
import QuantityProductButton from "@/components/product/sidebar/price/quantityButton";
import { useToggleFavoriteProduct } from "@/hooks/useToggleFavoriteProduct";
import { useCartActionsLoadingHandler } from "@/hooks/useCartActionsLoadingHandler";

import { useRestockNotification } from "@/hooks/useRestockNotification";
import { FavoriteColors } from "@/components/marketHome/intro/orderInformation/enum";

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
}) => {
  const { isFavorite, isLoading, toggleFavorite } =
    useToggleFavoriteProduct(!!user_favorite);

  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();

  const { data } = useCart();

  const { restockNotification, restockNotificationLoading } =
    useRestockNotification(id);

  const productOrder = data.find((order) => order.product_id === id);

  const url = generateSingleProductUrlFromId(id, slug);

  const isProductHasStock = quantity !== 0;

  return (
    <div className={`${style.product} ${gridView ? style.gridView : ""}`}>
      <div className={style.productImage}>
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
              <div className={style.productQuantityWrapper}>
                <QuantityProductButton
                  id={productOrder.id}
                  quantity={productOrder.quantity}
                  cardActionsLoadingHandler={cartActionsLoadingHandler}
                />
              </div>
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
                    cartActionsLoadingHandler(() =>
                      cartActions.addToCart(id, [])
                    )
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
