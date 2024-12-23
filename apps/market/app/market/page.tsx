import { api } from "@/api/Api";
import Banners from "@/components/marketHome/banners";

import Companies from "@/components/marketHome/companies";
import Discounts from "@/components/marketHome/discounts";
import Intro from "@/components/marketHome/intro";
import Link from "next/link";
import style from "@/components/marketHome/banners/Banners.module.scss";
import classNames from "classnames";
import CategoryBanner from "@/components/marketHome/categoryBanner";
import { HomePageProductSliders } from "@/components/HomePageProductSliders";

export default async function HomeMarket() {
  const ProvidersList = (await api.getProviders()).data.data;
  const amazingProducts = (
    await api.getAmazingProductList({ page: "1", limit: "10" })
  ).data;
  const sliders = (await api.getMainSliders()).data.data;

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
      <section className={`${style.bannersItem} ${style.bannersItemFull}`}>
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
              )
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
        className={classNames("col-4 col-lg-2", style.bannersPropertyItem)}
        showTitles
      />
    </>
  );
}
