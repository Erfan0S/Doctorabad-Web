import React from "react";
import { ProductSingleProps } from "@/types/props";
import {
  MobileProductLayout,
  StaticMobileProductList,
} from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
import { MobileTabsConfigWithContent } from "@repo/core/types/configs";
import { Product, SingleProduct } from "@repo/core/types/product";
import ProductSpecifications from "@/components/product/tabs/specifications";
import ProductComments from "@/components/product/tabs/comments";
import sanitize from "@repo/core/utils/sanitize";
import { OrderType } from "@repo/core/types/cart";
import { marketPaths } from "@repo/core/constants/routePath";
import ProductHeaderSuffix from "@/components/product/mobileLayout/ProductHeaderSuffix";

const TabsConfig = (
  data: SingleProduct,
  relatedProductList: Product[],
): MobileTabsConfigWithContent[] => [
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
    content: (
      <>
        <StaticMobileProductList
          app={Apps.MARKET}
          products={relatedProductList.map((p) => ({
            baseUrl: marketPaths.single,
            id: p.id.toString(),
            title: p.title,
            installmentPayment: p.installment_payment,
            pic_url: p.product_pic,
            price_main: p.price_main,
            price_off: p.price_amazing || p.price_off,
          }))}
        />
      </>
    ),
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
        tabsData={TabsConfig(data, relatedProductList)}
        title={data.title || data.title_en || "____"}
        provider={{
          id: data.provider.id,
          name: data.provider.name,
          img_url: data.provider.pic_url,
        }}
        tabParam={searchParams?.tab as string}
        productButtonProps={{
          mainPrice: data.price_main,
          installment_payment: data.installment_payment,
          installment_text: data.installment_text || " ",
          offPrice: data.price_off,
          app: Apps.MARKET,
          amazingPrice: data.price_amazing,
          productId: data.id,
          orderType: OrderType.ShopProduct,
          canIncrease: true,
        }}
        headerSuffix={<ProductHeaderSuffix product={data} />}
      />
    </>
  );
}

export default MobileProductSingle;
