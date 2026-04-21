import { SingleProduct } from "@repo/core/types/product";
import style from "./ProductDescription.module.scss";
import sanitize from "@repo/core/utils/sanitize";

interface Props {
  productData: SingleProduct;
}
const ProductDescription: React.FC<Props> = ({ productData }) => {
  return (
    <>
      <div
        className={style.productDescription}
        dangerouslySetInnerHTML={{ __html: sanitize(productData.description) }}
      ></div>
      {/* <ProductFaq faq={productData.faq} /> */}
    </>
  );
};

export default ProductDescription;
