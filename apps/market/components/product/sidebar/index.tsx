"use client";

import { useEffect, useState } from "react";
import style from "./ProductSidebar.module.scss";

import ProductSidebarCountdown from "./countdown";
import ProductSidebarHeader from "./header";
import ProductSidebarNotice from "./notice";
import ProductSidebarPrice from "./price";
import { SingleProduct } from "@repo/core/types/product";
import ProductSidebarAttribute from "./attribute";
import { ProductVariantsValue } from "@repo/core/types/productVariants";

interface Props {
  product: SingleProduct;
}

const ProductSidebar = ({ product }: Props) => {
  const [currentPrduct, setCurrentProduct] = useState(product);
  let [variants, setVariants] = useState<ProductVariantsValue[]>([]);

  useEffect(() => {
    setCurrentProduct(product);
  }, [product]);

  return (
    <div className={style.productSidebar}>
      <ProductSidebarHeader
        isFavorite={!!currentPrduct?.user_favorite}
        id={currentPrduct.id}
        sampleUrl={currentPrduct.sample_file[0]?.url}
      />
      <ProductSidebarNotice
        readyToShipState={currentPrduct.sts}
        bonusCoins={currentPrduct.coins}
        normalDiscount={
          currentPrduct.price_off
            ? currentPrduct.price_main - currentPrduct.price_off
            : null
        }
        festivalDiscount={undefined}
      />
      {currentPrduct.amazing_end_date && (
        <ProductSidebarCountdown
          discountFestivalEndDate={currentPrduct.amazing_end_date}
        />
      )}
      <ProductSidebarAttribute
        product={currentPrduct}
        setProduct={setCurrentProduct}
        basePriceMain={product.price_main}
        basePriceOff={product.price_off}
        productVariants={setVariants}
      />
      <ProductSidebarPrice product={currentPrduct} variants={variants} />
    </div>
  );
};

export default ProductSidebar;
