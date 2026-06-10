import { api } from "@/api/Api";
import BigBanner from "@/components/home/BigBanner";
import { bigBannerData } from "@/components/home/BigBanner/big-banner-data";
import BlogSlider from "@/components/home/blogSlider";
import Companies from "@/components/home/companies";
import Intro from "@/components/home/intro";
import Statistics from "@/components/home/Statistics";
import ServiceShortcuts from "@/components/home/ServiceShortcuts";
import { IP_COUNTRY_COOKIE } from "@repo/core/constants/constants";
import { cookies } from "next/headers";
import HomeHeader from "@/components/headers/homeHeader";
import { isUserLoggedInAsync } from "@repo/core/utils/authUtils";
import MainSliderSection from "@/components/home/mainSlider/MainSliderSection";
import DoctorToolsSection from "@/components/home/DoctorToolsSection/DoctorToolsSection";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";

export default async function Home() {
  const ProvidersList = (await api.getProviders()).data.data;
  const statistic = (await api.getHomeStatistics()).data.data;
  const blogPosts = (await api.getMagazinePosts()).data.data;
  const country = cookies().get(IP_COUNTRY_COOKIE)?.value;
  const isLoggedIn = await isUserLoggedInAsync();

  return (
    <>
      {isLoggedIn ? (
        <>
          <div>
            <MainSliderSection />
            <ServiceShortcuts />
            <DoctorToolsSection />
            <BlogSlider
              data={blogPosts}
              title="دکترمگ"
              archiveLink="https://doctorabad.com/mag"
            />
          </div>
        </>
      ) : (
        <>

          <MainSliderSection />
          <ServiceShortcuts />
          <DoctorToolsSection />
          {/* <Intro statistic={statistic} />
          <Statistics statistic={statistic} />
          {bigBannerData.map((item, index) => (
            <BigBanner key={index} {...item} />
          ))} */}
          <BlogSlider
            data={blogPosts}
            title="دکترمگ"
            archiveLink="https://doctorabad.com/mag"
          />
          <Companies list={ProvidersList} />
        </>
      )}
    </>
  );
}
