import { api } from "@/api/Api";
import AppDownload from "@/components/appDownload";
import { homeMetadata } from "@repo/core/metadata/home";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = homeMetadata("/", "ایلیکیشن دکترآباد");

const AppDownloadPage = async () => {
  const statistic = (await api.getHomeStatistics()).data.data;

  return <AppDownload statistic={statistic} />;
};

export default AppDownloadPage;
