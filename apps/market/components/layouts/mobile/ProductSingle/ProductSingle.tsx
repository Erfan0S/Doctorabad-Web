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
import MobileProductVariantButton from "@/components/product/mobileLayout/MobileProductVariantButton";
import ProductSlider from "@/components/product/intro/slider";
import styles from "./ProductSingle.module.scss";
import bundleProviderImagefrom from "@repo/shared_modules/images/bundel_provider.jpg";
import { isBundledWithNonProducts } from "@/utils/isBundledWithNonProducts";

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
            providerTitle: p.provider || undefined,
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
  const haveVariant = Object.keys(data.variants).length > 0;

  return (
    <>
      <MobileProductLayout
        app={Apps.MARKET}
        preview={
          <div className={styles.productSlyderContainer}>
            <ProductSlider
              title={data.title}
              slider={data.files}
              thumbnail={data.product_pic}
              isMobileLayout
            />
          </div>
        }
        tabsData={TabsConfig(data, relatedProductList)}
        title={data.title || data.title_en || "____"}
        provider={{
          id: data.is_bundle ? undefined : data.provider.id,
          name: data.is_bundle ? undefined : data.provider.name,
          img_url: data.is_bundle
            ? bundleProviderImagefrom.src
            : data.provider.pic_url,
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
          canIncrease: !isBundledWithNonProducts(data),
          replaceButton: haveVariant ? (
            <MobileProductVariantButton product={data} />
          ) : undefined,
        }}
        headerSuffix={<ProductHeaderSuffix product={data} />}
      />
    </>
  );
}

export default MobileProductSingle;
