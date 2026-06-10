import { api } from "@/api/Api";
import AppDownload from "@/components/appDownload";
import BigBanner from "@/components/home/BigBanner";
import { bigBannerData } from "@/components/home/BigBanner/big-banner-data";
import Intro from "@/components/home/intro";
import Statistics from "@/components/home/Statistics";
import { homeMetadata } from "@repo/core/metadata/home";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = homeMetadata("/", "اپلیکیشن دکترآباد");

const AppDownloadPage = async () => {
  const statistic = (await api.getHomeStatistics()).data.data;

  // return <AppDownload statistic={statistic} />;
  return (
    <>
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
