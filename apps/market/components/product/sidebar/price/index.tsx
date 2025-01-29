import { priceFormatter } from "@repo/core/utils";
import style from "./ProductSidebarPrice.module.scss";
import { SingleProduct } from "@repo/core/types";
import { calcDiscountPercentage } from "@repo/core/utils";
import { CartItem as Props } from "@repo/shared_modules";
import QuantityProductButton from "./quantityButton";
import { useCart, cartActions } from "@repo/core/states";
import { authorizeClientAction } from "@repo/core/utils";
import { useCartActionsLoadingHandler } from "@/hooks/useCartActionsLoadingHandler";
import Loading from "@/components/common/loading";
import { useRestockNotification } from "@/hooks/useRestockNotification";
import { ProductVariantsValue } from "@repo/core/types";

interface Props {
  // color?: 'orange' | 'blue' | 'gray';
  product: SingleProduct;
  variants: ProductVariantsValue[];
}

const ProductSidebarPrice: React.FC<Props> = ({ product, variants }) => {
  const { data } = useCart();

  const { cartActionsLoadingHandler, updateCartLoading } =
    useCartActionsLoadingHandler();

  const productOrder = data.find((order) => order.product_id === product.id);

  const getDiscountInformation = () => {
    let offPrice = null;
    let discount = null;

    if (product.price_off || product.price_amazing) {
      discount = calcDiscountPercentage(
        product.price_main,
        product.price_amazing || product.price_off
      );
      offPrice = product.price_amazing || product.price_off;
    }
    // else if (product.discount_festivals[0]) {
    //   const discountFestival = product.discount_festivals[0];

    //   if (discountFestival.percent) {
    //     discount = discountFestival.percent;
    //     const discountPrice = (product.main_price / 100) * discount;
    //     offPrice = product.main_price - Math.min(discountFestival.max_cost || 0, discountPrice);
    //   } else if (discountFestival?.amount) {
    //     offPrice = product.main_price - discountFestival.amount;
    //   }
    // }

    return {
      discountPercent: discount,
      offPrice,
      mainPrice: product.price_main,
    };
  };

  const { restockNotification, restockNotificationLoading } =
    useRestockNotification(product.id);

  const { discountPercent, mainPrice, offPrice } = getDiscountInformation();

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
      {productOrder && !product.variants ? (
        <QuantityProductButton
          cardActionsLoadingHandler={cartActionsLoadingHandler}
          id={productOrder.id}
          quantity={productOrder.quantity}
        />
      ) : (
        <div className={style.productSidebarPriceButton}>
          {isProductHasStock ? (
            <button
              onClick={authorizeClientAction(
                cartActionsLoadingHandler(() =>
                  cartActions.addToCart(product.id, variants)
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
