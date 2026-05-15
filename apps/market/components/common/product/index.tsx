"use client";
import Image from "next/image";
import style from "./Product.module.scss";
import { ProductCard } from "@repo/core/types/product";
import Link from "next/link";

import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { priceFormatter } from "@repo/core/utils/priceFormatter";

import { calcDiscountPercentage } from "@repo/core/utils/calcDiscountPercentage";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
import Loading from "../loading";
import { useToggleFavoriteProduct } from "@/hooks/useToggleFavoriteProduct";

import { useRestockNotification } from "@/hooks/useRestockNotification";
import { OrderType } from "@repo/core/types/cart";
import {
  AddToCartButton,
  Button,
  FavoriteHeartIcon,
  ListProductSnappayNotif,
} from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";

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
  isMobileLayout = false,
}) => {
  const { isFavorite, isLoading, toggleFavorite } =
    useToggleFavoriteProduct(!!user_favorite);

  const { restockNotification, restockNotificationLoading } =
    useRestockNotification(id);

  const url = generateSingleProductUrlFromId(id, slug);

  const isProductHasStock = quantity !== 0;

  return (
    <div
      className={`${style.product} ${gridView ? style.gridView : ""} ${isMobileLayout ? style.mobileLayout : ""}`}
    >
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
                      price_amazing || price_off,
                    )}
                  </small>
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
            {isProductHasStock ? (
              has_variant ? (
                <Button
                  className={style.productVariantButton}
                  app={Apps.MARKET}
                >
                  <Link href={url}>انتخاب گزینه‌ها خرید</Link>
                </Button>
              ) : (
                <AddToCartButton
                  id={id}
                  type={OrderType.ShopProduct}
                  app={Apps.MARKET}
                  className={`${style.productAddToCart}`}
                  compact
                  isFullWidth
                  canIncrease
                />
              )
            ) : (
              <Button
                app={Apps.MARKET}
                className={style.productNoStock}
                onClick={restockNotification}
                disabled={restockNotificationLoading}
              >
                {restockNotificationLoading ? (
                  <Loading size={22} />
                ) : (
                  "موجود شد خبرم کن!"
                )}
              </Button>
            )}
            <button
              aria-label="AddToFavorite"
              className={style.productAddToFavorite}
              onClick={() => toggleFavorite(id)}
            >
              <FavoriteHeartIcon
                isFavorite={isFavorite}
                loading={isLoading}
                size={24}
                app={Apps.MARKET}
              />
            </button>
          </>
        </div>
      </div>
    </div>
  );
};
export default Product;
