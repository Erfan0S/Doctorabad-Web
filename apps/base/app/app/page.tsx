import { api } from "@/api/Api";
import AppDownload from "@/components/appDownload";
import React from "react";

const AppDownloadPage = async () => {
  const statistic = (await api.getHomeStatistics()).data.data;

  return <AppDownload statistic={statistic} />;
};

export default AppDownloadPage;
