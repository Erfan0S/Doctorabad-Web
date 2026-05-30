import ProductIntro from "@/components/product/intro";
import ProductSidebar from "@/components/product/sidebar";
import ProductTabs from "@/components/product/tabs";
import { ProductSingleProps } from "@/types/props";
import React from "react";

function DesktopProductSingle({
  data,
  relatedProductList,
}: ProductSingleProps) {
  console.log(data);

  return (
    <>
      <div className="col-xl-8">
        <ProductIntro productData={data} />
        <ProductTabs
          productData={data}
          relatedProductList={relatedProductList}
        />
      </div>
      <div className="col-xl-4 d-none d-xl-block">
        <ProductSidebar product={data} />
      </div>
    </>
  );
}

export default DesktopProductSingle;
