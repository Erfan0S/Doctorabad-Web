"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "@/components/common/product";
import DiscountRightContent from "./right-content";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import style from "./Discounts.module.scss";
import "swiper/css";
import { autoPlayConfig } from "@/constants/sliders";
import { AmazingProduct } from "@repo/core/types";
import { useClientComponentInitiated } from "@/hooks/useClientComponentInitiated";

interface Props {
  products: AmazingProduct[];
  expireTime: string;
}

const Discounts = ({ products, expireTime }: Props) => {
  const shouldRender = useClientComponentInitiated();

  const isDesktop = useMediaQuery("min-width:1200px");

  return (
    <section className={style.discounts}>
      <div className="container">
        <div className={style.discountsWrapper}>
          {isDesktop && shouldRender && (
            <DiscountRightContent endDate={expireTime} />
          )}
          <div className={`${style.discountsContent}`}>
            <Swiper
              autoplay={isDesktop ? autoPlayConfig : undefined}
              spaceBetween={30}
              speed={700}
              slidesPerView="auto"
              breakpoints={{
                0: {
                  slidesPerView: 1.7,
                },
                768: {
                  slidesPerView: 2.2,
                },
                992: {
                  slidesPerView: 3.6,
                },
              }}
            >
              {!isDesktop && shouldRender && (
                <SwiperSlide>
                  <DiscountRightContent endDate={expireTime} />
                </SwiperSlide>
              )}
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  {<Product {...product} />}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discounts;
