import { ProductTabData, SingleProduct } from "@repo/core/types/product";
import ProductComments from "./comments";
import ProductTabsController from "./controller";
import ProductDescription from "./description";
import ProductFaq from "./faq";
import ProductSpecifications from "./specifications";

// each tab section; on mobile give grid columns inside a section a gap
const SECTION_CLASS = "mb-8 max-md:[&_[class^='col-']]:mb-3";

interface Props {
  productData: SingleProduct;
}

const ProductTabs: React.FC<Props> = ({ productData }) => {
  const tabData: ProductTabData[] = [];

  if (productData.description)
    tabData.push({ id: "description", title: "معرفی" });
  if (productData.attributes.length || productData.bundle_products?.length)
    tabData.push({ id: "specifications", title: "مشخصات" });
  if (productData.faq.length) tabData.push({ id: "faq", title: "پرسش و پاسخ" });
  tabData.push({ id: "comments", title: "دیدگاه کاربران" });

  return (
    <>
      <ProductTabsController tabData={tabData} />
      <div className="market-panel mb-5 p-6">
        {productData.description && (
          <section id="description" className={SECTION_CLASS}>
            <ProductDescription description={productData.description} />
          </section>
        )}
        {(productData.attributes.length ||
          productData.bundle_products?.length) && (
          <section id="specifications" className={SECTION_CLASS}>
            <ProductSpecifications
              specifications={productData.attributes}
              bundleProducts={productData.bundle_products}
            />
          </section>
        )}
        {productData.faq.length ? (
          <section id="faq" className={SECTION_CLASS}>
            <ProductFaq faq={productData.faq} />
          </section>
        ) : null}
        <section id="comments" className={SECTION_CLASS}>
          <ProductComments productData={productData} />
        </section>
      </div>
    </>
  );
};

export default ProductTabs;
