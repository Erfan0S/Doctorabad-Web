import { api } from "@/api/Api";
import BlogSlider from "@/components/home/blogSlider";
import Companies from "@/components/home/companies";
import ServiceShortcuts from "@/components/home/ServiceShortcuts";
import { IP_COUNTRY_COOKIE } from "@repo/core/constants/constants";
import { cookies } from "next/headers";
import { MobileHomeHeader } from "@repo/shared_modules/headers";

import { isUserLoggedInAsync } from "@repo/core/utils/authUtils";
import MainSliderSection from "@/components/home/mainSlider/MainSliderSection";
import DoctorToolsSection from "@/components/home/DoctorToolsSection/DoctorToolsSection";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import { Apps } from "@repo/core/types/general";
import Footer from "../../../packages/shared_modules/common/components/footer";
import DownloadAppBanner from "@/components/home/DownloadAppBanner";

import { SidePanelPage } from "@repo/core/types/sidePanel";
import SidePanelAutoOpener from "@/components/SidePanelAutoOpener";
import SearchBar from "@/components/Search/SearchBar";

export default async function Home({
  searchParams,
}: {
  searchParams: { sidePanel?: string };
}) {
  const { sidePanel } = searchParams;
  const safePage =
    sidePanel && (Object.values(SidePanelPage) as string[]).includes(sidePanel)
      ? (sidePanel as SidePanelPage)
      : undefined;

  const ProvidersList = (await api.getProviders()).data.data;
  const statistic = (await api.getHomeStatistics()).data.data;
  const blogPosts = (await api.getMagazinePosts()).data.data;
  const isLoggedIn = await isUserLoggedInAsync();

  return (
    <>
      {safePage && <SidePanelAutoOpener initialPage={safePage} />}
      <DiviceSwitchShell
        desktop={
          <div className="container">
            <SearchBar />
          </div>
        }
        mobile={
          <MobileHomeHeader
            haveSearch={true}
            type={Apps.BASE}
            haveFilterButton={false}
          />
        }
      />

      {/* <MobileHomeHeader
        haveSearch={true}
        type={Apps.BASE}
        haveFilterButton={false}
      /> */}

      {isLoggedIn ? (
        <>
          <div>
            <MainSliderSection />
            <ServiceShortcuts />
            <DiviceSwitchShell
              desktop={<DoctorToolsSection isDesktop />}
              mobile={<DoctorToolsSection isDesktop={false} />}
            />{" "}
            <DiviceSwitchShell desktop={<DownloadAppBanner />} mobile={null} />
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
          <DiviceSwitchShell
            desktop={<DoctorToolsSection isDesktop />}
            mobile={<DoctorToolsSection isDesktop={false} />}
          />{" "}
          <DiviceSwitchShell desktop={<DownloadAppBanner />} mobile={null} />
          <BlogSlider
            data={blogPosts}
            title="دکترمگ"
            archiveLink="https://doctorabad.com/mag"
          />
          <Companies list={ProvidersList} />
        </>
      )}
      <DiviceSwitchShell
        desktop={<Footer statistic={statistic} />}
        mobile={<Footer statistic={statistic} />}
      />
    </>
  );
}
