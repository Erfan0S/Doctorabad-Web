"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Banners from "../banners";
import { Banner } from "@/types/banner";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import {
  autoPlayConfig,
  categoryBannerBreakpoint,
} from "@repo/core/constants/sliders";
import style from "./CategoryBanner.module.scss";
import { Autoplay } from "swiper/modules";
import { useClientComponentInitiated } from "@repo/core/hooks/useClientComponentInitiated";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
interface Props {
  data: Banner[];
}
const CategoryBanner: React.FC<Props> = ({ data }) => {
  const shouldRender = useClientComponentInitiated();
  const isMobile = useMediaQuery("max-width:768px");
  const imageOptions = { width: 250, height: 165 };

  if (!shouldRender) return null;

  return (
    <>
      <section className={style.categoryBanner}>
        <div className="container">
          {isMobile ? (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={"auto"}
              loop
              autoplay={autoPlayConfig}
              breakpoints={categoryBannerBreakpoint}
            >
              {data.map(({ id, title, pic_url, url }) => {
                const BannerItem = () => (
                  <Image
                    className={style.categoryBannerImage}
                    {...imageOptions}
                    src={pic_url || placeHolderDataUrl}
                    alt={title || "Banner"}
                  />
                );
                return (
                  <SwiperSlide key={id}>
                    {url ? (
                      <Link target="_blank" href={url} title={title}>
                        <BannerItem />
                      </Link>
                    ) : (
                      <BannerItem />
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <Banners data={data} imageOptions={imageOptions} />
          )}
        </div>
      </section>
    </>
  );
};

export default CategoryBanner;
