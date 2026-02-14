import localFont from "next/font/local";
import Footer from "@/components/common/footer";
import { homeViewPort } from "@repo/core/metadata/home";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/grid.scss";
import "../assets/styles/general.scss";
import Providers from "@/providers/providers";
import NextTopLoader from "nextjs-toploader";
import { api } from "@repo/shared_modules/api";
import { InstallBannerShow } from "@repo/shared_modules/components";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import MobileNavBar from "@repo/shared_modules/navbar/mobile";
import Script from "next/script";
import MarketHeader from "@/components/common/header/market";
import { Metadata, Viewport } from "next";
import { homeMetadata } from "@/metadata/home";
import { Apps } from "@repo/core/types/general";

const font = localFont({
  src: "../assets/fonts/IRANSansXV.woff2",
  display: "swap",
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
      <body className={`${font.className} desktop_body`}>
        <NextTopLoader color="#f54f1a" />
        <div className="root">
          <Providers>
            <DiviceSwitchShell
              DesktopComponent={<MarketHeader />}
              MobileComponent={null}
            />

            <main>{children}</main>
            <MobileNavBar />

            <DiviceSwitchShell
              DesktopComponent={<Footer statistic={statistic} />}
              MobileComponent={null}
            />

            <InstallBannerShow statistic={statistic} />
          </Providers>
        </div>
      </body>
    </html>
  );
}
