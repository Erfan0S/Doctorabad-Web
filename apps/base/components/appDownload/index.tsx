import React from "react";
import style from "./AppDownload.module.scss";
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
    <div className={style.downloadPageWrapper}>
      <div className={style.downloadWrapper}>
        <div className={style.downloadHeader}>
          <AppDownloadTitle className={style.titleResponsiveWide} />
          <Image src={downloadImage || ""} alt="download page image" />
        </div>
        <div className={style.downloadLinksWrapper}>
          <div className={style.downloadLinks}>
            {DownloadLinks.map((link) => (
              <Link href={link.url} target={"_blank"} key={link.url}>
                <Image
                  src={link.image || ""}
                  alt={link.alt || "download link"}
                />
              </Link>
            ))}
          </div>

          {/*<div className={style.mobileWrapper}>*/}
          {/*  <input type="number" className={style.mobileInput} placeholder="شماره موبایلتون چند بود؟!" />*/}
          {/*  <button className={style.mobileButton}>ارسال لینک دانلود اپلیکیشن</button>*/}
          {/*</div>*/}
        </div>
        <AppDownloadTitle className={style.titleResponsiveShort} />
      </div>
    </div>
  );
};

export default AppDownload;
