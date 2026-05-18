import { api } from "@/api/Api";
import HomeHeader from "@/components/Header/HomeHeader";
import MainPage from "@/components/LearnHome";
import { Apps } from "@repo/core/types/general";
import { MainSlider } from "@repo/shared_modules/components";
import { Banner } from "@/types/banner";
import React from "react";
import { baseUrls } from "@repo/core/constants/routePath";

const HomeLearn = async () => {
  const banners = (await api.getMainSlider()).data.data;
  const getUrl = ({ url, collection_id, package_id, provider_id }: Banner) => {
    if (url) {
      return url;
    }
    if (collection_id) {
      return `${baseUrls.download}/collections/${collection_id}`;
    }
    if (package_id) {
      return `${baseUrls.download}/package/${package_id}`;
    }
    if (provider_id) {
      return `${baseUrls.download}/publishers/${provider_id}`;
    }
    return "";
  };
  const mainBanners = banners.map(
    ({
      id,
      picture: pic_url,
      url,
      title,
      collection_id,
      package_id,
      provider_id,
    }) => ({
      id,
      pic_url,
      url: getUrl({ url, collection_id, package_id, provider_id }),
      title,
    }),
  );

  return (
    <div>
      <HomeHeader />
      {mainBanners && (
        <MainSlider
          banners={mainBanners || []}
          swiperOptions={{ spaceBetween: 0 }}
          app={Apps.DOWNLOAD}
        />
      )}
      <MainPage />
    </div>
  );
};

export default HomeLearn;
