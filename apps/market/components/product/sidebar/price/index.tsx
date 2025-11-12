import { priceFormatter } from "@repo/core/utils/priceFormatter";
import style from "./ProductSidebarPrice.module.scss";
import { SingleProduct } from "@repo/core/types/product";
import { getDiscountInformation } from "@repo/core/utils/getDiscountInformation";
import { CartItem as Props } from "@repo/shared_modules";
import { useCart, cartActions } from "@repo/core/states/cart";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { useCartActionsLoadingHandler } from "@repo/core/hooks/useCartActionsLoadingHandler";
import Loading from "@/components/common/loading";
import { useRestockNotification } from "@/hooks/useRestockNotification";
import { ProductVariantsValue } from "@repo/core/types/productVariants";
import { OrderType } from "@repo/core/types/cart";
import { useEffect } from "react";
import {
  ProductSnappayNotif,
  QuantityProductButton,
} from "@repo/shared_modules/components";

interface Props {
  // color?: 'orange' | 'blue' | 'gray';
  product: SingleProduct;
  variants: ProductVariantsValue[];
}

const ProductSidebarPrice: React.FC<Props> = ({ product, variants }) => {
  const { data } = useCart();

  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();

  const productOrder = data.find(
    (order) =>
      order.product_id === product.id &&
      order.product_type === OrderType.ShopProduct
  );

  const haveVariants = Object.keys(product.variants).length > 0;

  const { restockNotification, restockNotificationLoading } =
    useRestockNotification(product.id);

  const { discountPercent, mainPrice, offPrice } = getDiscountInformation(
    product.price_main,
    product.price_off,
    product.price_amazing || undefined
  );

  const isProductHasStock = product.quantity !== 0;
  const color = isProductHasStock ? "orange" : "grey";
  return (
    <div
      className={`${style.productSidebarPrice} ${color ? style[color] : ""}`}
    >
      {isProductHasStock && (
        <div className={style.productSidebarPriceNumber}>
          <div>
            {discountPercent && <small>٪{discountPercent}</small>}
            {offPrice && (
              <span>
                {priceFormatter(mainPrice)}
                <small>تومن</small>
              </span>
            )}
          </div>
          <div>
            {priceFormatter(offPrice || mainPrice)}
            <small>تومن</small>
          </div>
        </div>
      )}
      {productOrder && !haveVariants ? (
        <QuantityProductButton
          cardActionsLoadingHandler={cartActionsLoadingHandler}
          id={productOrder.id}
          quantity={productOrder.quantity}
          isLoadibg={updateCartLoading}
        />
      ) : (
        <div className={style.productSidebarPriceButton}>
          {product.installment_payment && product.installment_text && (
            <ProductSnappayNotif text={product.installment_text} />
          )}
          {isProductHasStock ? (
            <button
              onClick={authorizeClientAction(
                cartActionsLoadingHandler(() =>
                  cartActions.addToCart(
                    product.id,
                    OrderType.ShopProduct,
                    variants
                  )
                )
              )}
            >
              {updateCartLoading ? <Loading size={22} /> : "افزودن به سبد"}
            </button>
          ) : (
            <button
              className={style.productSidebarPriceButtonNoStuck}
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
          {/* <button
            onClick={authorizeClientAction(
              cartActionsLoadingHandler(() => cartActions.addToCart(product.id))
            )}
            disabled={!isProductHasStock}
          >
            {isProductHasStock ? 'اضافه کردن به سبد خرید' : 'موجود شد خبرم کن!'}
          </button> */}
        </div>
      )}
    </div>
  );
};

export default ProductSidebarPrice;
