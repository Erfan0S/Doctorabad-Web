"use client";
import { modalActions } from "@repo/core/modal/modals";
import { OrderType } from "@repo/core/types/cart";
import { Apps } from "@repo/core/types/general";
import { SingleProduct } from "@repo/core/types/product";
import { ProductButton } from "@repo/shared_modules/components";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import React, { useState } from "react";
import { ProductSidebarAttributeProps } from "../sidebar/attribute";
import { ProductVariantsValue } from "@repo/core/types/productVariants";

type Props = {
  product: SingleProduct;
};

function MobileProductVariantButton({ product }: Props) {
  const [currentPrduct, setCurrentProduct] = useState(product);

  return (
    <ProductButton
      mainPrice={product.price_main}
      orderType={OrderType.ShopProduct}
      productId={product.id}
      amazingPrice={product.price_amazing}
      installment_payment={product.installment_payment}
      installment_text={product.installment_text || ""}
      offPrice={product.price_off}
      text="انتخاب گزینه‌ها"
      app={Apps.MARKET}
      compact
      canIncrease
      onClick={() =>
        modalActions.addModal<
          ModalTypes.PRODUCT_VARIANT_MODAL,
          Omit<ProductSidebarAttributeProps, "productVariants">
        >(ModalTypes.PRODUCT_VARIANT_MODAL, {
          baseAmazingPrice: product.price_amazing,
          basePriceMain: product.price_main,
          basePriceOff: product.price_off,
          product: currentPrduct,
          setProduct: setCurrentProduct,
        })
      }
    />
  );
}

export default MobileProductVariantButton;
