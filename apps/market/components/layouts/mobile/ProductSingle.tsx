import React from "react";
import { ProductSingleProps } from "@/types/props";
import { MobileProductLayout } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
import { MobileTabsConfigWithContent } from "@repo/core/types/configs";
import { SingleProduct } from "@repo/core/types/product";
import ProductSpecifications from "@/components/product/tabs/specifications";
import ProductComments from "@/components/product/tabs/comments";
import sanitize from "@repo/core/utils/sanitize";

const TabsConfig = (data: SingleProduct): MobileTabsConfigWithContent[] => [
  {
    id: "1",
    title: "توضیحات",
    content: (
      <div
        dangerouslySetInnerHTML={{
          __html: sanitize(data.description),
        }}
      />
    ),
  },
  {
    id: "2",
    title: "مشخصات",
    content: <ProductSpecifications productData={data} />,
  },
  {
    id: "3",
    title: "نظرات",
    content: <ProductComments productData={data} />,
  },
  {
    id: "4",
    title: "مرتبط",
    content: "",
  },
];

function MobileProductSingle({
  data,
  relatedProductList,
  searchParams,
}: ProductSingleProps) {
  return (
    <>
      <MobileProductLayout
        app={Apps.MARKET}
        preview={data.product_pic}
        tabsData={TabsConfig(data)}
        title={data.title || data.title_en || "____"}
        provider={{
          id: data.provider.id,
          name: data.provider.name,
          img_url: data.provider.pic_url,
        }}
        tabParam={searchParams?.tab as string}
      />
    </>
  );
}

export default MobileProductSingle;
