"use client";

import { useEffect, useState } from "react";

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
    <div className="market-panel sticky top-[150px] flex min-h-[375px] flex-col p-6 max-xl:static">
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
        baseAmazingPrice={product.price_amazing}
        productVariants={setVariants}
      />
      <ProductSidebarPrice product={currentPrduct} variants={variants} />
    </div>
  );
};

export default ProductSidebar;
