import { OrderType } from "@repo/core/types/cart";
import { SingleProduct } from "@repo/core/types/product";

export const isBundledWithNonProducts = (product: SingleProduct) =>
  product.bundled_products?.some(
    (bundledProduct) => bundledProduct.type !== OrderType.ShopProduct,
  );
