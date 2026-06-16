import { api } from "@/api/Api";
import HomeHeader from "@/components/Header/HomeHeader";
import MainPage from "@/components/LearnHome";
import { Apps } from "@repo/core/types/general";
import { MainSlider } from "@repo/shared_modules/components";
import React from "react";

const HomeLearn = async () => {
  const banners = (await api.getMainSlider()).data.data;
  const mainBanners = banners.map(({ id, pic_url, url, title }) => ({
    id,
    pic_url,
    url,
    title,
  }));

  return (
    <div>
      <HomeHeader />
      {mainBanners && (
        <MainSlider
          banners={mainBanners || []}
          swiperOptions={{ spaceBetween: 0 }}
          app={Apps.LEARN}
          isMobileLayout
        />
      )}
      <MainPage />
    </div>
  );
};

export default HomeLearn;
