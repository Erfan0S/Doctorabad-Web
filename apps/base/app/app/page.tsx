import { api } from "@/api/Api";
import AppDownload from "@/components/appDownload";
import HomeHeader from "@/components/headers/homeHeader";
import BigBanner from "@/components/home/BigBanner";
import { bigBannerData } from "@/components/home/BigBanner/big-banner-data";
import Intro from "@/components/home/intro";
import Statistics from "@/components/home/Statistics";
import { homeMetadata } from "@repo/core/metadata/home";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = homeMetadata("/", "اپلیکیشن دکترآباد");

const AppDownloadPage = async () => {
  const statistic = (await api.getHomeStatistics()).data.data;

  // return <AppDownload statistic={statistic} />;
  return (
    <>
                      <DiviceSwitchShell desktop={null} mobile={<HomeHeader  />} />

      <Intro statistic={statistic} />
      <Statistics statistic={statistic} />
      {bigBannerData.map((item, index) => (
        <BigBanner key={index} {...item} />
      ))}
      ;
    </>
  );
};

export default AppDownloadPage;
