"use client";
import Image from "next/image";
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
  ProductPrice,
} from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";

// Card styling lives in packages/tailwind-config/components.css (.market-product-*).
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
      className={`market-product-card ${gridView ? "market-product-card-grid" : ""} ${isMobileLayout ? "market-product-card-mobile" : ""}`}
    >
      <div className="market-product-image">
        {installment_payment && (
          <ListProductSnappayNotif className="market-product-installment" />
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
      <div className="market-product-content">
        <div className="market-product-title">
          <h2>
            <Link href={url}>{title}</Link>
          </h2>
        </div>
        {isProductHasStock && (
          <ProductPrice
            mainPrice={price_main}
            offPrice={price_off}
            amazingPrice={price_amazing}
            className="market-product-price"
            app={Apps.MARKET}
          />
        )}
        <div className="market-product-buttons">
          <>
            {isProductHasStock ? (
              has_variant ? (
                <Button
                  className="market-product-variant-btn"
                  app={Apps.MARKET}
                >
                  <Link href={url}>انتخاب گزینه‌ها</Link>
                </Button>
              ) : (
                <AddToCartButton
                  id={id}
                  type={OrderType.ShopProduct}
                  app={Apps.MARKET}
                  className="market-product-add-to-cart"
                  compact
                  isFullWidth
                  canIncrease
                />
              )
            ) : (
              <Button
                app={Apps.MARKET}
                className="market-product-no-stock"
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
              className="market-product-add-to-favorite"
              onClick={() => toggleFavorite(id)}
            >
              <FavoriteHeartIcon
                isFavorite={isFavorite}
                loading={isLoading}
                size={23}
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
