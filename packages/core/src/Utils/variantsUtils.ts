import { SingleProduct } from "@repo/core/types/product";
import {
  ProductVariants,
  ProductVariantsValues,
  Variants,
} from "@repo/core/types/productVariants";

export const variantsSorter = (variants: Variants): ProductVariants => {
  const variantsByType: ProductVariants = Object.entries(variants).reduce(
    (prev: any, [variantCategory, variant]) => {
      const isCheckboxVariant = variant.some((v) => v.check_box == true);

      if (isCheckboxVariant) {
        prev.checkbox = [
          ...prev.checkbox,
          { variants: variant, category: variantCategory },
        ];
      } else {
        prev.selections[variantCategory] = variant;
      }

      return prev;
    },
    { selections: {}, checkbox: [] }
  );

  return variantsByType;
};

export const updateProductPrice = (
  values: ProductVariantsValues,
  product: SingleProduct
) => {
  let variantPrice = Object.entries(values).reduce(
    ({ addedPrice, subtractedPrice }, [category, vaiant]) => {
      const selectedVariant = product.variants[category].find(
        (v) => v.id == vaiant.id
      );

      let variantAddedPrice = selectedVariant?.added_price;
      let variantSubtractedPrice = selectedVariant?.subtracted_price;

      return {
        addedPrice: variantAddedPrice
          ? addedPrice + variantAddedPrice
          : addedPrice,
        subtractedPrice: variantSubtractedPrice
          ? subtractedPrice + variantSubtractedPrice
          : subtractedPrice,
      };
    },
    { addedPrice: 0, subtractedPrice: 0 }
  );

  return variantPrice;
};
