"use client";
import { SingleProduct } from "@repo/core/types/product";
import ProductBreadcrumb from "./breadcrumb";
import ProductSeller from "./seller";
import ProductShortDescription from "./shortDescription";
import ProductSlider from "./slider";
import ProductTitle from "./title";

import ProductSidebar from "../sidebar";
import { generateProductCategoryUrlFromId } from "@repo/core/utils/UrlUtils";
import bundleProviderImagefrom from "@repo/shared_modules/images/bundel_provider.jpg";

interface Props {
  productData: SingleProduct;
}
const ProductIntro: React.FC<Props> = ({ productData }) => {
  const category = productData?.category?.length
    ? productData?.category[0]
    : null;

  const provider: SingleProduct["provider"] = productData.is_bundle
    ? {
        pic_url: bundleProviderImagefrom.src,
      }
    : productData.provider;

  return (
    <>
      <div className="market-panel mb-5 min-h-[375px] p-6">
        <div className="flex flex-wrap -mx-[15px]">
          <div className="relative w-full px-[15px] lg:flex-[0_0_50%] lg:max-w-[50%]">
            <ProductSlider
              title={productData.title}
              slider={productData.files}
              thumbnail={productData.product_pic}
            />
          </div>
          <div className="relative w-full px-[15px] lg:flex-[0_0_50%] lg:max-w-[50%]">
            {/* ponytail: old style.productIntroContent had no rules in the scss module - dropped */}
            <div>
              {category && (
                <ProductBreadcrumb
                  items={[
                    {
                      title: category.title,
                      link: generateProductCategoryUrlFromId(category.id),
                    },
                    { title: productData.title },
                  ]}
                />
              )}
              <ProductSeller seller={provider} />
              <ProductTitle title={productData.title} />
              <ProductShortDescription shortDescription={productData.summary} />
            </div>
          </div>
        </div>
      </div>
      <div className="xl:hidden">
        <ProductSidebar product={productData} />
      </div>
    </>
  );
};

export default ProductIntro;
