"use client";
import { SingleProduct } from "@repo/core/types";
import style from "./ProductIntro.module.scss";
import ProductBreadcrumb from "./breadcrumb";
import ProductSeller from "./seller";
import ProductShortDescription from "./shortDescription";
import ProductSlider from "./slider";
import ProductTitle from "./title";

import ProductSidebar from "../sidebar";
import { generateProductCategoryUrlFromId } from "@repo/core/utils";
interface Props {
  productData: SingleProduct;
}
const ProductIntro: React.FC<Props> = ({ productData }) => {
  const category = productData?.category?.length
    ? productData?.category[0]
    : null;

  return (
    <>
      <div className={style.productIntro}>
        <div className="row">
          <div className="col-lg-6">
            <ProductSlider
              title={productData.title}
              slider={productData.files}
              thumbnail={productData.product_pic}
            />
          </div>
          <div className="col-lg-6">
            <div className={style.productIntroContent}>
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
              <ProductSeller seller={productData.provider} />
              <ProductTitle title={productData.title} />
              <ProductShortDescription shortDescription={productData.summary} />
            </div>
          </div>
        </div>
      </div>
      <div className="d-xl-none">
        <ProductSidebar product={productData} />
      </div>
    </>
  );
};

export default ProductIntro;
