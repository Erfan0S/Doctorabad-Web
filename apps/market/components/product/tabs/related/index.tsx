import { Product } from "@repo/core/types";
import ProductSlider from "@/components/marketHome/productSlider";
import { relatedSliderBreakpoints } from "@/constants/sliders";
interface Props {
  relatedProducts: Product[];
}

const ProductRelated: React.FC<Props> = ({ relatedProducts }) => {
  if (!relatedProducts.length) return null;

  return (
    <>
      <ProductSlider
        data={relatedProducts}
        title="اینا رو هم ببین!"
        customSliderConfig={{ breakpoints: relatedSliderBreakpoints }}
      />
      <p></p>
    </>
  );
};

export default ProductRelated;
