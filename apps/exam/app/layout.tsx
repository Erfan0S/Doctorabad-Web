import localFont from "next/font/local";

import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/grid.scss";
import "../assets/styles/general.scss";

import NextTopLoader from "nextjs-toploader";
import { api } from "@repo/shared_modules/api";
import { InstallBannerShow, Loading } from "@repo/shared_modules/components";
import { Suspense } from "react";
import MobileNavBar from "@repo/shared_modules/navbar/mobile";
import { homeViewPort } from "@repo/core/metadata/home";
import { Metadata, Viewport } from "next";
import Providers from "@/providers/providers";
import { Apps } from "@repo/core/types/general";
import { homeMetadata } from "@/metadata/home";
import { SharedHeadContents } from "@repo/shared_modules";

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
      <SharedHeadContents />
      <body className={`${font.className} ${font.variable}`}>
        <NextTopLoader color="#7030a0" />
        <div className="root">
          <Providers>
            <Suspense fallback={<Loading app={Apps.EXAM} pageLoader />}>
              <div className="learn-container">
                {children}
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
    </html>
  );
}
