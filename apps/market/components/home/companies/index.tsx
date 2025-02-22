"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { ProvidersList } from "@/types/providers";
import Link from "next/link";
import { generateSingleProviderUrlFromId } from "@repo/core/utils/urlutils";
import style from "./Companies.module.scss";
import "swiper/css";
import { autoPlayConfig } from "@repo/core/constants/sliders";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";

interface Props {
  list: ProvidersList;
}

const Companies = ({ list }: Props) => {
  return (
    <section className={style.companies}>
      <div className="container">
        <Swiper
          modules={[Autoplay]}
          autoplay={autoPlayConfig}
          freeMode
          loop
          speed={700}
          slidesPerView={"auto"}
          spaceBetween={30}
          breakpoints={{
            400: { slidesPerView: 3.5, spaceBetween: 10 },
            320: { slidesPerView: 2.5, spaceBetween: 10 },
            992: { slidesPerView: 6.5, spaceBetween: 15 },
          }}
        >
          {list.map(({ id, name, avatar_file }) => (
            <SwiperSlide key={id}>
              <div className={style.companiesItem}>
                <Link href={generateSingleProviderUrlFromId(id)}>
                  <Image
                    src={avatar_file?.info.path || placeHolderDataUrl}
                    alt={name}
                    fill
                    priority
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Companies;
