import style from "./ProductSidebarPrice.module.scss";
import { SingleProduct } from "@repo/core/types/product";
import { CartItem as Props } from "@repo/shared_modules";
import { ProductVariantsValue } from "@repo/core/types/productVariants";
import { OrderType } from "@repo/core/types/cart";
import {
  AddToCartButton,
  ProductPrice,
  ProductSnappayNotif,
} from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
import { isBundledWithNonProducts } from "@/utils/isBundledWithNonProducts";
import NoStockButton from "./NoStockButton";

interface Props {
  product: SingleProduct;
  variants: ProductVariantsValue[];
}

const ProductSidebarPrice: React.FC<Props> = ({ product, variants }) => {
  const isProductHasStock = product.quantity !== 0;
  const color = isProductHasStock ? "orange" : "grey";
  return (
    <div
      className={`${style.productSidebarPrice} ${color ? style[color] : ""}`}
    >
      {isProductHasStock && (
        <ProductPrice
          mainPrice={product?.price_main}
          offPrice={product?.price_off}
          amazingPrice={product?.price_amazing}
          app={Apps.MARKET}
          className={style.productSidebarPriceNumber}
        />
      )}
      <div className={style.productSidebarPriceButton}>
        {product.installment_payment && product.installment_text && (
          <ProductSnappayNotif text={product.installment_text} />
        )}
        {isProductHasStock ? (
          <AddToCartButton
            id={product.id}
            type={OrderType.ShopProduct}
            app={Apps.MARKET}
            canIncrease={!isBundledWithNonProducts(product)}
            compact
            variants={variants}
          />
        ) : (
          <NoStockButton productId={product.id} />
        )}
      </div>
    </div>
  );
};

export default ProductSidebarPrice;
