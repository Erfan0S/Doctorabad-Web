import { NextPageProps } from "@repo/core/types/general";
import { Product, SingleProduct } from "@repo/core/types/product";

export interface ProductSingleProps extends Partial<NextPageProps> {
  data: SingleProduct;
  relatedProductList: Product[];
}
