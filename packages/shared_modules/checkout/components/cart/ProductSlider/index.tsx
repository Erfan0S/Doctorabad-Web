"use client";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import style from "./ProductSlider.module.scss";
import Link from "next/link";
import "swiper/css";
import { useEffect, useState } from "react";
import { Apps } from "@repo/core/types/general";
import Image from "next/image";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import ArrowLeft from "@repo/shared_modules/icons/arrowLeft";
import { Loading } from "@repo/shared_modules/components";
import { ProductSliderItemType } from "@repo/core/types/cart";

interface Props {
  data: ProductSliderItemType[];
  title: string;
  archiveLink?: string | null;
  isLoading?: boolean;
  customSliderConfig?: SwiperProps;
  app?: Apps;
}

const ProductSlider: React.FC<Props> = ({
  customSliderConfig,
  data,
  isLoading,
  archiveLink,
  title,
  app,
}) => {
  const [slidesPerView, setSlidesPerView] = useState(1);
  const spaceBetween = 5; // Set your desired space between slides here

  useEffect(() => {
    const handleResize = () => {
      const containerWidth =
        document.querySelector(`.${style.productSliderSlider}`)?.clientWidth ||
        0;
      const slideWidth = 175; // Assume each slide has a fixed width of 200px
      const newSlidesPerView = containerWidth / (slideWidth + spaceBetween);
      setSlidesPerView(newSlidesPerView);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isLoading && !data?.length) return null;

  return (
    <section className={style.productSlider}>
      <div>
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
                  <ArrowLeft fontSize={10} height={15} />
                </Link>
              </div>
            )}
          </div>
        )}
        <div className={style.productSliderSlider}>
          {isLoading ? (
            <Loading />
          ) : (
            <Swiper
              // spaceBetween={150}
              slidesPerView={"auto"}
              spaceBetween={10}
              speed={700}
              // breakpoints={swiperBreakpoints}
              {...customSliderConfig}
            >
              {data?.map((item, i) => (
                <SwiperSlide key={item.id + i}>
                  <Link href={`/course/${item.id}`}>
                    <Image
                      className={style.course}
                      src={item.pic_url || placeHolderDataUrl}
                      alt={item.product_type || "محصول"}
                      width={150}
                      height={95}
                      placeholder={placeHolderDataUrl}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
