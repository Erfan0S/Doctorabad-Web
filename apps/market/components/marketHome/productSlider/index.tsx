"use client";
import { SwiperProps, SwiperSlide } from "swiper/react";
import { ProductCard } from "@repo/core/types/product";
import Product from "@/components/common/product";
import { ProductSliderContainer } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";

interface Props {
  data: ProductCard[];
  title?: string;
  archiveLink?: string;
  customSliderConfig?: SwiperProps;
  isMobileLayout?: boolean;
}

const ProductSlider: React.FC<Props> = ({
  data,
  title = undefined,
  archiveLink = undefined,
  customSliderConfig = {},
  isMobileLayout = false,
}) => {
  if (!data.length) return null;

  return (
    <ProductSliderContainer
      title={title}
      archiveLink={archiveLink}
      customSliderConfig={customSliderConfig}
      app={Apps.MARKET}
      isMobileLayout={isMobileLayout}
      dynamicSlideWidth
      slideWidth={200}
      spaceBetween={7}
    >
      {data.map((product, i) => (
        <SwiperSlide key={product.id}>
          <Product {...product} isMobileLayout={isMobileLayout} />
        </SwiperSlide>
      ))}
    </ProductSliderContainer>
  );
};

export default ProductSlider;
