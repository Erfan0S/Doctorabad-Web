import { ProductVariants, Variants } from "@repo/core/types";
import React from "react";

const variantsSorter = (variants: Variants): ProductVariants => {
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

export default variantsSorter;
