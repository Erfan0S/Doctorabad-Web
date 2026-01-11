import localFont from "next/font/local";

import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/grid.scss";
import "../assets/styles/general.scss";

import Providers from "@/providers/providers";
import NextTopLoader from "nextjs-toploader";
import { api } from "@repo/shared_modules/api";
import { InstallBannerShow } from "@repo/shared_modules/components";
import Script from "next/script";
import { Suspense } from "react";
import MobileNavBar from "@repo/shared_modules/navbar/mobile";
import { homeViewPort } from "@repo/core/metadata/home";
import { Metadata, Viewport } from "next";
import { homeMetadata } from "@/metadata/home";

const font = localFont({
  src: "../assets/fonts/IRANSansXV.woff2",
  display: "swap",
  variable: "--font-iran-sans",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = homeMetadata;
export const viewPort: Viewport = homeViewPort;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const statistic = (await api.getHomeStatistics()).data.data;
  return (
    <html lang="fa">
      <head></head>
      <body className={`${font.className} ${font.variable}`}>
        <NextTopLoader color="#EE2E53" />
        <div className="root">
          <Providers>
            <Suspense fallback={<div></div>}>
              <div className="learn-container">
                <main>{children}</main>
                <MobileNavBar
                  onlyOnMobile={false}
                  excludePaths={["checkout", "course"]}
                />
              </div>
            </Suspense>
            <InstallBannerShow statistic={statistic} />
          </Providers>
        </div>
      </body>
      <Script
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(){var i="cskpcR",a=window,d=document;function g(){var g=d.createElement("script"),s="https://www.goftino.com/widget/"+i,l=localStorage.getItem("goftino_"+i);g.async=!0,g.src=l?s+"?o="+l:s;d.getElementsByTagName("head")[0].appendChild(g);}"complete"===d.readyState?g():a.attachEvent?a.attachEvent("onload",g):a.addEventListener("load",g,!1);}();`,
          }}
      />
    </html>
  );
}
