import { HomePageProductSliders } from "@/components/HomePageProductSliders";
import CategoryBanner from "@/components/marketHome/categoryBanner";
import Companies from "@/components/marketHome/companies";
import Discounts from "@/components/marketHome/discounts";
import Intro from "@/components/marketHome/intro";
import React from "react";
import Banners from "@/components/marketHome/banners";
import classNames from "classnames";
import { ProvidersList } from "@/types/providers";
import { AmazingProduct } from "@repo/core/types/product";
import { Banner } from "@/types/banner";
import Link from "next/link";

type Props = {
  sliders: Banner[];
  amazingProducts: { data: AmazingProduct[]; amazing_time: string };
  ProvidersList: ProvidersList;
};

function DesktopMainPage({ sliders, amazingProducts, ProvidersList }: Props) {
  return (
    <>
      <Intro
        mainSliders={sliders.filter((s) => s.location === 1)}
        sideSliders={sliders.filter((s) => s.location === 2)}
      />
      <Companies list={ProvidersList} />
      {!!amazingProducts.data.length && (
        <Discounts
          products={amazingProducts.data}
          expireTime={amazingProducts.amazing_time}
        />
      )}

      <CategoryBanner data={sliders.filter((s) => s.location === 3)} />
      <HomePageProductSliders type="suggested" />
      <HomePageProductSliders type="bestSelling" />
      <HomePageProductSliders type="lastSeen" />
      <section className="market-banner-item market-banner-item-full">
        <div className="container">
          {sliders
            .filter((s) => s.location === 4)
            .map(({ id, title, pic_url, url }) =>
              url ? (
                <Link key={id} href={url} title={title} target="_blank">
                  <img src={pic_url} alt={pic_url} />
                </Link>
              ) : (
                <img key={id} src={pic_url} alt={pic_url} />
              ),
            )}
        </div>
      </section>

      <HomePageProductSliders type="newest" />
      <Banners
        data={sliders.filter((s) => s.location === 5)}
        imageOptions={{ width: 250, height: 165 }}
        className={classNames("col-6 col-lg-3")}
      />

      <Banners
        data={sliders.filter((s) => s.location === 6)}
        imageOptions={{ width: 140, height: 110 }}
        className={classNames("col-4 col-lg-2", "market-banner-property-item")}
        showTitles
      />
    </>
  );
}

export default DesktopMainPage;
