import { SingleProduct } from '@/types/product';
import style from './ProductDescription.module.scss';
import ProductFaq from '../faq';
interface Props {
  productData: SingleProduct;
}
const ProductDescription: React.FC<Props> = ({ productData }) => {
  return (
    <>
      <div
        className={style.productDescription}
        dangerouslySetInnerHTML={{ __html: productData.description }}
      ></div>
      {/* <ProductFaq faq={productData.faq} /> */}
    </>
  );
};

export default ProductDescription;
