"use client";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { modalActions } from "@repo/core/modal/modals";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import Image from "next/image";
import Link from "next/link";
import {
  AddToCartButton,
  Button,
  FavoriteButton,
  QuantityProductButton,
} from "../../../common/components";
import style from "./SidePanelFavoritesShopping.module.scss";
import { useCartActionsLoadingHandler } from "@repo/core/hooks/useCartActionsLoadingHandler";
import { Product } from "@repo/core/types/product";
import { cartActions, useCart } from "@repo/core/states/cart";
import { OrderType } from "@repo/core/types/cart";
import { Apps } from "@repo/core/types/general";
import { baseUrls, marketPaths } from "@repo/core/constants/routePath";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { api } from "../../../api/Api";

type Props = {
  data: Product;
};

function ShoppingFavoriteItem({
  data: {
    id,
    title,
    price_main,
    price_off,
    product_pic,
    slug,
    has_variant,
    user_favorite,
  },
}: Props) {
  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();

  const { data } = useCart();
  const productOrder = data.find(
    (order) =>
      order.product_id === id && order.product_type === OrderType.ShopProduct,
  );

  return (
    <div className={style.sidePanelFavoritesLearningItem}>
      <Link
        key={id}
        href={generateSingleProductUrlFromId(id, slug)}
        onClick={() => modalActions.clearModals()}
      >
        <Image
          width={100}
          height={65}
          src={product_pic || placeHolderDataUrl}
          alt="favoritesImage"
          className={style.sidePanelFavoritesLearningItemImage}
        />
      </Link>
      <div className={style.sidePanelFavoritesLearningItemContent}>
        <div className={style.sidePanelFavoritesLearningItemTitle}>
          <Link
            key={id}
            href={generateSingleProductUrlFromId(id, slug)}
            onClick={() => modalActions.clearModals()}
          >
            {title}
          </Link>
          <FavoriteButton
            app={Apps.MARKET}
            initialState={!!user_favorite}
            action={() => {
              return api.addMarketFavorite(id);
            }}
          />
        </div>
        <div className={style.sidePanelFavoritesLearningItemFooter}>
          <div className={style.sidePanelFavoritesLearningItemPrice}>
            {price_off ? (
              <>
                <small>{priceFormatter(price_main)} تومن</small>
                <span>{priceFormatter(price_off)} تومن</span>
              </>
            ) : (
              <span>{priceFormatter(price_main)} تومن</span>
            )}
          </div>
          {!has_variant ? (
            productOrder ? (
              <QuantityProductButton
                orderId={productOrder.id}
                quantity={productOrder.quantity}
                className={style.sidePanelFavoritesLearningItemQuantityButton}
                orderType={OrderType.ShopProduct}
                app={Apps.MARKET}
              />
            ) : (
              <AddToCartButton
                app={Apps.MARKET}
                id={id}
                type={OrderType.ShopProduct}
                className={style.sidePanelFavoritesLearningItemAddToCart}
                onClick={authorizeClientAction(
                  cartActionsLoadingHandler(() => cartActions.addToCart(id)),
                )}
                isLoading={updateCartLoading}
              />
            )
          ) : (
            <a
              href={`${baseUrls.market}${marketPaths.single}/${id}/${slug}`}
              target="_blank"
            >
              <Button
                app={Apps.MARKET}
                className={style.sidePanelFavoritesLearningItemVariantButton}
              >
                انتخاب گزینه‌های خرید
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingFavoriteItem;
