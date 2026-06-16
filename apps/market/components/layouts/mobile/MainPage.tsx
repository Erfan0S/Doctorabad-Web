import React from "react";
import { ProvidersList } from "@/types/providers";
import { AmazingProduct } from "@repo/core/types/product";
import { Banner } from "@/types/banner";
import { MobileHomeHeader } from "@repo/shared_modules/headers";
import { Apps } from "@repo/core/types/general";
import { MainSlider } from "@repo/shared_modules/components";
import { HomePageProductSliders } from "@/components/HomePageProductSliders";
import { MainTabsData } from "@/constants/tabsData";
import OrderInformationWithFetch from "@/components/marketHome/intro/orderInformation/OrderInformationWithFetch";
import { marketPaths } from "@repo/core/constants/routePath";
import { FilterParams } from "@/constants/filter";

type Props = {
  sliders: Banner[];
  amazingProducts: { data: AmazingProduct[]; amazing_time: string };
  ProvidersList: ProvidersList;
};

function MobileMainPage({ sliders, ProvidersList, amazingProducts }: Props) {
  return (
    <>
      <div>
        <MobileHomeHeader
          type={Apps.MARKET}
          tabData={MainTabsData}
          haveSearch
          customeSearchUrl={marketPaths.search}
          customeFilterUrl={marketPaths.archive}
          searchKey={FilterParams.SEARCH}
        />
        <div>
          {sliders && (
            <MainSlider
              banners={sliders.filter((s) => s.location === 1) || []}
              swiperOptions={{ spaceBetween: 0 }}
              app={Apps.MARKET}
              isMobileLayout
            />
          )}
          <div className="container" style={{ marginBottom: "20px" }}>
            <OrderInformationWithFetch />
          </div>

          <HomePageProductSliders type="suggested" isMobileLayout />
          <HomePageProductSliders type="newest" isMobileLayout />
          <HomePageProductSliders type="bestSelling" isMobileLayout />
          <HomePageProductSliders type="lastSeen" isMobileLayout />
        </div>
      </div>
    </>
  );
}

export default MobileMainPage;
