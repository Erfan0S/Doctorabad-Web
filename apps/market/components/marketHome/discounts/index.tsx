"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "@/components/common/product";
import DiscountRightContent from "./right-content";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import "swiper/css";
import { autoPlayConfig } from "@repo/core/constants/sliders";
import { AmazingProduct } from "@repo/core/types/product";
import { useClientComponentInitiated } from "@repo/core/hooks/useClientComponentInitiated";

interface Props {
  products: AmazingProduct[];
  expireTime: string;
}

const Discounts = ({ products, expireTime }: Props) => {
  const shouldRender = useClientComponentInitiated();
  const isDesktop = useMediaQuery("min-width:1200px");

  return (
    <section className="py-10 max-md:pt-0 max-md:pb-4 [&_.swiper-slide]:h-auto max-md:[&_.container]:p-0">
      <div className="container">
        <div className="rounded-[20px] bg-orange flex py-5 max-md:rounded-none">
          {isDesktop && shouldRender && <DiscountRightContent endDate={expireTime} />}
          <div className="flex-[0_0_calc(100%_-_200px)] max-w-[calc(100%_-_200px)] max-xl:flex-[0_0_100%] max-xl:max-w-full [&_.swiper]:p-5">
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
