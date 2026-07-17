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
  // ponytail: old style.orange / style.grey / style.productSidebarPriceNumber
  // had no rules in the scss module - dropped
  return (
    <div className="flex items-end gap-[10px]">
      {isProductHasStock && (
        <ProductPrice
          mainPrice={product?.price_main}
          offPrice={product?.price_off}
          amazingPrice={product?.price_amazing}
          app={Apps.MARKET}
        />
      )}
      <div className="w-[60%]">
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
