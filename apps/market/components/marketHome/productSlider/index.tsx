"use client";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import style from "./ProductSlider.module.scss";
import Link from "next/link";
import { ProductCard } from "@repo/core/types";
import Product from "@/components/common/product";
import "swiper/css";
import { autoPlayConfig, swiperBreakpoints } from "@repo/core/constants";
import { Autoplay } from "swiper/modules";

interface Props {
  data: ProductCard[];
  title?: string;
  archiveLink?: string;
  customSliderConfig?: SwiperProps;
}

const ProductSlider: React.FC<Props> = ({
  data,
  title = undefined,
  archiveLink = undefined,
  customSliderConfig = {},
}) => {
  if (!data.length) return null;

  return (
    <section className={style.productSlider}>
      <div className="container">
        {(title || archiveLink) && (
          <div className={style.productSliderHeader}>
            {title && (
              <div className={style.productSliderHeaderTitle}>
                <span>{title}</span>
              </div>
            )}
            {archiveLink && (
              <div className={style.productSliderHeaderLink}>
                <Link href={archiveLink} title={title}>
                  مشاهده‌همه
                </Link>
              </div>
            )}
          </div>
        )}
        <div className={style.productSliderSlider}>
          <Swiper
            modules={[Autoplay]}
            autoplay={autoPlayConfig}
            spaceBetween={30}
            slidesPerView={"auto"}
            speed={700}
            breakpoints={swiperBreakpoints}
            loop
            {...customSliderConfig}
          >
            {data.map((product, i) => (
              <SwiperSlide key={product.id}>
                <Product {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
