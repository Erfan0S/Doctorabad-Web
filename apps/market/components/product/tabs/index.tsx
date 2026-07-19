import { Product, ProductTab, SingleProduct } from "@repo/core/types/product";
import ProductComments from "./comments";
import ProductTabsController from "./controller";
import ProductDescription from "./description";
import ProductRelated from "./related";
import ProductSpecifications from "./specifications";

import { productTabsData } from "./tabs-data";
interface Props {
  productData: SingleProduct;
  relatedProductList: Product[];
}

const productSectionsComponents = {
  [ProductTab.DESCRIPTION]: ProductDescription,
  [ProductTab.SPECIFICATIONS]: ProductSpecifications,
  [ProductTab.RELATED_PRODUCTS]: ProductRelated,
  [ProductTab.COMMENTS]: ProductComments,
};

const ProductTabs: React.FC<Props> = ({ productData, relatedProductList }) => {
  return (
    <>
      <ProductTabsController
        tabData={productTabsData.filter(
          (tab) =>
            !(
              !relatedProductList.length &&
              tab.id === ProductTab.RELATED_PRODUCTS
            ),
        )}
      />
      <div
        id="productInfoContainer"
        className="bg-white rounded-xl p-6 shadow-md mb-5"
      >
        {Object.entries(productSectionsComponents).map(([id, Component]) => (
          <div className="mb-8 " id={id} key={id}>
            <Component
              productData={productData}
              relatedProducts={relatedProductList}
              description={productData.description}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductTabs;
