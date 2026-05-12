"use client";
import ProductSidebarAttribute, {
  ProductSidebarAttributeProps,
} from "@/components/product/sidebar/attribute";
import { OrderType } from "@repo/core/types/cart";
import { Apps } from "@repo/core/types/general";
import { ModalProps } from "@repo/core/types/modals";
import { ProductVariantsValue } from "@repo/core/types/productVariants";
import { AddToCartButton, ModalWrapper } from "@repo/shared_modules/components";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ProductVariantModal: React.FC<
  ModalProps<Omit<ProductSidebarAttributeProps, "productVariants">>
> = ({ data, closeModal }) => {
  const product = data.product;
  let [variants, setVariants] = useState<ProductVariantsValue[]>([]);

  useEffect(() => {
    console.log(variants);
  }, [variants]);

  return (
    <ModalWrapper
      closeModal={closeModal}
      app={Apps.MARKET}
      customIcon={
        <Image
          alt={product.title}
          src={product.product_pic}
          width={100}
          height={100}
          style={{
            width: "100px",
            height: "100px",
          }}
        />
      }
      submitButton={
        <AddToCartButton
          id={product.id}
          type={OrderType.ShopProduct}
          app={Apps.MARKET}
          compact
          onSucceed={() => {
            console.log(variants);

            closeModal();
          }}
          variants={variants}
        />
      }
    >
      <div style={{ width: "100%", maxWidth: "250px" }}>
        <ProductSidebarAttribute productVariants={setVariants} {...data} />
      </div>
    </ModalWrapper>
  );
};

export default ProductVariantModal;
