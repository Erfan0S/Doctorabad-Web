import React from "react";
import AppDownloadTitle from "./appDownloadTitle";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import downloadImage from "@/assets/img/tablet-pro-phone-responsive-website-mockup_106244-2123.png";
import googlePlay from "@/assets/img/d1.jpg";
import appStore from "@/assets/img/d2.jpg";
import directDownload from "@/assets/img/d3.jpg";
import pwaApp from "@/assets/img/d4.png";
import iApps from "@/assets/img/d7.jpg";
import anardoni from "@/assets/img/d6.jpg";
import sibIrani from "@/assets/img/d8.jpg";
import charkhoneh from "@/assets/img/d5.jpg";
import { HomeStatisticsType } from "@/types/homeStatistics";
import PatchNoteList from "./patchNoteList";

type Props = {
  statistic: HomeStatisticsType;
};

type DownloadLinksType = {
  url: string;
  image: StaticImageData;
  alt?: string;
};

const AppDownload = ({ statistic }: Props) => {
  const DownloadLinks: DownloadLinksType[] = [
    {
      image: googlePlay,
      url: statistic.google_play_url,
      alt: "googlePlay",
    },
    {
      image: appStore,
      url: statistic.app_store_url,
      alt: "appStore",
    },
    {
      image: directDownload,
      url: statistic.direct_download_url,
      alt: "pwaApp",
    },
    {
      image: iApps,
      url: "https://iapps.ir/app/DoctorAbad/986479615",
      alt: "iApps",
    },
    {
      image: pwaApp,
      url: "/pwa",
      alt: "pwaAppGuide",
    },
    {
      image: anardoni,
      url: "https://anardoni.com/ios/app/zgbjGaxmN?lng=fa",
      alt: "anardoni",
    },
    {
      image: charkhoneh,
      url: "https://www.charkhoneh.com/content/930823130",
      alt: "Charkhoneh",
    },
    {
      image: sibIrani,
      url: "https://sibirani.com/apps/DoctorAbad/",
      alt: "SibIrani",
    },
  ];

  return (
    <div className="w-full px-[100px] max-[1750px]:px-5">
      <div className="mb-5 flex h-screen min-h-[800px] w-full flex-row pb-[85px] pt-[60px] max-[750px]:h-auto max-[750px]:flex-col-reverse">
        <div className="ml-[15px] flex h-full flex-1 flex-col items-center justify-center">
          <AppDownloadTitle className="max-[750px]:hidden" />
          <Image src={downloadImage || ""} alt="download page image" className="h-auto w-full" />
        </div>
        <div className="flex max-h-[90%] flex-1 flex-col flex-wrap items-center justify-center rounded-[55px] bg-[#f2f2f2] px-[85px] max-[1750px]:px-[50px] max-[1750px]:py-[70px] max-[1150px]:px-[30px] max-[1150px]:py-[50px] max-[750px]:rounded-[30px] max-[750px]:px-10 max-[750px]:pb-5 max-[750px]:pt-[5px]">
          <div className="flex w-[65%] flex-row flex-wrap justify-center max-[750px]:w-full">
            {DownloadLinks.map((link) => (
              <Link href={link.url} target={"_blank"} key={link.url} className="ml-5 mt-5 w-[45%] max-w-[350px] even:ml-0">
                <Image
                  src={link.image || ""}
                  alt={link.alt || "download link"}
                  className="h-auto w-full rounded-lg"
                />
              </Link>
            ))}
          </div>
        </div>
        <AppDownloadTitle className="hidden max-[750px]:flex" />
      </div>
    </div>
  );
};

export default AppDownload;
