"use client";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import Link from "next/link";
import "swiper/css";
import { useEffect, useState } from "react";
import { Apps } from "@repo/core/types/general";
import Image from "next/image";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import ArrowLeft from "@repo/shared_modules/icons/arrowLeft";
import { Loading } from "@repo/shared_modules/components";
import { OrderType, CartProductSliderItemType } from "@repo/core/types/cart";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";

// SCSS→Tailwind: stable literal class replacing style.productSliderSlider,
// which is read back via document.querySelector for the slidesPerView math.
const SLIDER_CONTAINER_CLASS = "product-slider-slider";

interface Props {
  data: CartProductSliderItemType[];
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
        document.querySelector(`.${SLIDER_CONTAINER_CLASS}`)?.clientWidth ||
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
    <section className="mb-4 last:mb-0">
      <div>
        {(title || archiveLink) && (
          <div className="relative mb-2 flex items-center justify-center">
            {title && (
              <div className="relative z-[2]">
                <span className="text-right text-[12px] font-bold leading-5 text-gray-dark">
                  {title}
                </span>
              </div>
            )}
            {archiveLink && (
              <div className="relative z-[2] ms-auto bg-white ps-3">
                <Link
                  href={archiveLink}
                  title={title}
                  className="flex items-center rounded-lg ps-4 text-[14px] font-medium leading-7 text-gray-dark transition-all duration-150 hover:text-black"
                >
                  مشاهده‌همه
                  <ArrowLeft fontSize={10} height={15} />
                </Link>
              </div>
            )}
          </div>
        )}
        <div
          className={`${SLIDER_CONTAINER_CLASS} relative before:absolute before:bottom-0 before:left-[-15px] before:top-0 before:z-[90] before:w-[15px] before:bg-white before:content-[''] max-md:before:hidden [&_.swiper]:pb-3 [&_.swiper-slide]:w-auto`}
        >
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
              {data.map((item, i) => (
                <SwiperSlide key={item.product_id + i}>
                  <a
                    href={generateSingleProductUrlFromId(
                      item.product_id,
                      "",
                      item.product_type as OrderType
                    )}
                    target="_blank"
                  >
                    <Image
                      className="aspect-auto h-[95px] w-auto rounded-[10px] bg-white bg-cover bg-center object-scale-down shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                      src={item.product_picture || placeHolderDataUrl}
                      alt={item.product_type || "محصول"}
                      width={150}
                      height={95}
                      placeholder={placeHolderDataUrl}
                    />
                  </a>
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
