"use client";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import style from "./ProductSlider.module.scss";
import Link from "next/link";
import "swiper/css";
import {
  autoPlayConfig,
  swiperBreakpoints,
} from "@repo/core/constants/sliders";
import { Autoplay } from "swiper/modules";
import { Apps } from "@repo/core/types/general";
import ArrowLeft from "../../../../assets/svg/arrowLeft";
import DiscountCountdown from "../../DiscountCountdown";
import { useEffect, useRef, useState } from "react";
import { isServerSide } from "@repo/core/constants/constants";

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
      className={`${style.productSlider} ${isMobileLayout ? style.mobileLayout : ""} ${style[app]}`}
    >
      <div className="container">
        {(title || archiveLink) && (
          <div className={style.productSliderHeader}>
            {title && (
              <div className={style.productSliderHeaderTitle}>
                <span>{title}</span>
              </div>
            )}
            {amazingTime && (
              <div className={style.productSliderHeaderAmazingTime}>
                <DiscountCountdown
                  endDate={amazingTime}
                  style="secondary"
                  app={app}
                  className={style.amazingTimeCountdown}
                />
              </div>
            )}
            {archiveLink && (
              <div className={style.productSliderHeaderLink}>
                <Link href={archiveLink} title={title}>
                  مشاهده‌همه
                  {isMobileLayout && <ArrowLeft fontSize={10} height={15} />}
                </Link>
              </div>
            )}
          </div>
        )}
        <div className={style.productSliderSlider} ref={containerRef}>
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
