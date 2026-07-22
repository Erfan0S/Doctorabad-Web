import ProductIntro from "@/components/product/intro";
import ProductSidebar from "@/components/product/sidebar";
import ProductTabs from "@/components/product/tabs";
import { ProductSingleProps } from "@/types/props";
import React from "react";

function DesktopProductSingle({
  data,
  relatedProductList,
}: ProductSingleProps) {
  return (
    <>
      <div className="relative w-full px-[15px] xl:flex-[0_0_66.666667%] xl:max-w-[66.666667%]">
        <ProductIntro productData={data} />
        <ProductTabs
          productData={data}
          relatedProductList={relatedProductList}
        />
      </div>
      <div className="relative w-full px-[15px] hidden xl:block xl:flex-[0_0_33.333333%] xl:max-w-[33.333333%]">
        <ProductSidebar product={data} />
      </div>
    </>
  );
}

export default DesktopProductSingle;
