import localFont from "next/font/local";

import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/grid.scss";
import "@repo/tailwind-config/components.css";

import Providers from "@/providers/providers";
import NextTopLoader from "nextjs-toploader";
import { api } from "@repo/shared_modules/api";
import { InstallBannerShow } from "@repo/shared_modules/components";
import { Suspense } from "react";
import MobileNavBar from "@repo/shared_modules/navbar/mobile";
import { homeViewPort } from "@repo/core/metadata/home";
import { Metadata, Viewport } from "next";
import { homeMetadata } from "@/metadata/home";
import { SharedHeadContents } from "@repo/shared_modules";

const font = localFont({
  src: "../assets/fonts/IRANSansXV.woff2",
  display: "swap",
  variable: "--font-iran-sans",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = homeMetadata;
export const viewport: Viewport = homeViewPort;

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
        <NextTopLoader color="#2aaadf" />
        <div className="root">
          <Providers>
            <Suspense fallback={<div></div>}>
              <div className="mobile-container">
                <main>{children}</main>
                <MobileNavBar
                  onlyOnMobile={false}
                  excludePaths={["checkout", "package"]}
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
