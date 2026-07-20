"use client";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import Link from "next/link";
import "swiper/css";
import { Apps } from "@repo/core/types/general";
import ArrowLeft from "../../../../assets/svg/arrowLeft";
import DiscountCountdown from "../../DiscountCountdown";
import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  title?: string;
  archiveLink?: string;
  customSliderConfig?: SwiperProps;
  isMobileLayout?: boolean;
  app?: Apps;
  amazingTime?: string;
  dynamicSlideWidth?: boolean;
  slideWidth?: number;
  spaceBetween?: number;
}

const ProductSliderContainer: React.FC<Props> = ({
  children,
  title = undefined,
  archiveLink = undefined,
  customSliderConfig = {},
  isMobileLayout = false,
  app = Apps.BASE,
  amazingTime,
  dynamicSlideWidth = false,
  slideWidth: slideWidthProp = 170,
  spaceBetween = 5,
}) => {
  if (!children) return null;

  const [slidesPerView, setSlidesPerView] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dynamicSlideWidth) return;

    const updateSlidesPerView = () => {
      if (containerRef.current) {
        const swiperEl = containerRef.current.querySelector(".swiper");
        if (swiperEl) {
          const style = window.getComputedStyle(swiperEl);
          const paddingLeft = parseFloat(style.paddingLeft) || 0;
          const paddingRight = parseFloat(style.paddingRight) || 0;
          const containerWidth =
            swiperEl.clientWidth - paddingLeft - paddingRight;

          let slideWidth = slideWidthProp;

          // Adjust slide width for small screens to prevent collision and overflow
          if (containerWidth < 500) {
            slideWidth = Math.min(slideWidth, containerWidth * 0.85);
          }

          const newSlidesPerView = containerWidth / (slideWidth + spaceBetween);

          // On mobile, force at least 1.1 to show peeking and prevent "collision" feel
          setSlidesPerView(
            containerWidth < 600
              ? Math.max(1.15, newSlidesPerView)
              : newSlidesPerView,
          );
        }
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateSlidesPerView();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Initial calculation
    updateSlidesPerView();

    return () => {
      resizeObserver.disconnect();
    };
  }, [dynamicSlideWidth, slideWidthProp, spaceBetween]);

  return (
    <section
      className={`w-full ${isMobileLayout ? "mb-[20px] p-0" : "px-0 py-10"} ${app}`}
    >
      <div className="container">
        {(title || archiveLink) && (
          <div
            className={`relative mb-4 flex w-full max-w-full items-center ${isMobileLayout ? "" : "before:absolute before:inset-x-0 before:top-1/2 before:z-[1] before:h-px before:bg-app-base before:content-['']"}`}
          >
            {title && (
              <div
                className={`relative z-[2] grow-0 pe-3 ${isMobileLayout ? "bg-transparent" : "bg-white"}`}
              >
                <span className="text-[14px] font-extrabold leading-[30px]">
                  {title}
                </span>
              </div>
            )}
            {amazingTime && (
              <div>
                <DiscountCountdown
                  endDate={amazingTime}
                  style="secondary"
                  app={app}
                  className="max-[425px]:text-[20px] max-[425px]:[&_span]:min-w-[25px] max-[425px]:[&_span]:text-[14px] max-[425px]:[&_span]:leading-[25px]"
                />
              </div>
            )}
            {archiveLink && (
              <div
                className={`relative z-[2] ms-auto ps-3 ${isMobileLayout ? "bg-transparent" : "bg-white"}`}
              >
                <Link
                  href={archiveLink}
                  title={title}
                  className={`flex flex-row items-center rounded-lg px-4 text-[14px] font-medium leading-[28px] transition-all duration-150 max-[425px]:text-[12px] ${isMobileLayout ? "bg-transparent pe-0 text-gray-dark hover:bg-transparent hover:text-black" : "bg-button-bg text-white hover:bg-app-base hover:text-white"}`}
                >
                  مشاهده‌همه
                  {isMobileLayout && <ArrowLeft fontSize={10} height={15} />}
                </Link>
              </div>
            )}
          </div>
        )}
        <div
          className="relative before:absolute before:end-[-15px] before:top-0 before:bottom-0 before:z-[100] before:w-[15px] before:bg-white before:content-[''] max-md:before:hidden [&_.swiper]:pt-[10px] [&_.swiper]:px-[15px] [&_.swiper]:pb-4 [&_.swiper]:mx-[-10px] [&_.swiper]:mt-[-10px] [&_.swiper]:mb-[-16px] max-lg:[&_.swiper]:ps-[10px] max-lg:[&_.swiper]:pe-[88px] [&_.swiper-slide]:h-auto [&_.swiper-slide]:flex [&_.swiper-slide]:justify-center [&_.swiper-slide]:w-[180px] [&_.swiper-slide>*]:w-full [&_.swiper-slide>*]:max-w-full"
          ref={containerRef}
        >
          <Swiper
            // modules={[Autoplay]}
            // autoplay={autoPlayConfig}
            spaceBetween={dynamicSlideWidth ? spaceBetween : 30}
            slidesPerView={dynamicSlideWidth ? slidesPerView : "auto"}
            speed={700}
            // breakpoints={dynamicSlideWidth ? {} : swiperBreakpoints}
            // loop
            {...customSliderConfig}
          >
            {children}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProductSliderContainer;
