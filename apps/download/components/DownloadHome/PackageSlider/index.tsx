"use client";
import { SwiperProps, SwiperSlide } from "swiper/react";
import style from "./ProductSlider.module.scss";
import Link from "next/link";
import "swiper/css";
import { PackageListItemType } from "@/types/packages";
import { Apps } from "@repo/core/types/general";
import Image from "next/image";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { ProductSliderContainer } from "@repo/shared_modules/components";

interface Props {
  data: PackageListItemType[];
  title: string;
  archiveLink?: string;
  isLoading?: boolean;
  customSliderConfig?: SwiperProps;
  amazingTime?: string;
}

const PackageSlider: React.FC<Props> = ({
  customSliderConfig,
  data,
  isLoading,
  archiveLink,
  title,
  amazingTime,
}) => {
  if (!isLoading && !(data?.length > 0)) return null;

  return (
    <ProductSliderContainer
      title={title}
      archiveLink={archiveLink}
      customSliderConfig={{ spaceBetween: 5, ...customSliderConfig }}
      app={Apps.DOWNLOAD}
      isMobileLayout
      amazingTime={amazingTime}
      dynamicSlideWidth
      slideWidth={115}
    >
      {data.map((packageItem, i) => (
        <SwiperSlide key={packageItem.id}>
          <Link href={`/package/${packageItem.id}/${packageItem.title.replace(/\s+/g, "-")}`}>
            <Image
              className={style.course}
              src={packageItem.picture || placeHolderDataUrl}
              alt={packageItem.title || "دروس"}
              width={100}
              height={100}
              placeholder={placeHolderDataUrl}
            />
          </Link>
        </SwiperSlide>
      ))}
    </ProductSliderContainer>
  );
};

export default PackageSlider;
