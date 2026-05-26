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
import MarketHeader from "@/components/common/header/market";
import { Metadata, Viewport } from "next";
import { homeMetadata } from "@/metadata/home";
import { marketPaths } from "@repo/core/constants/routePath";
import { SharedHeadContents } from "@repo/shared_modules";

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
      <SharedHeadContents />
      <body className={`${font.className} market_body`}>
        <NextTopLoader color="#f54f1a" />
        <div className="root">
          <Providers>
            <DiviceSwitchShell desktop={<MarketHeader />} mobile={null} />

            <main>{children}</main>
            <MobileNavBar excludePaths={[marketPaths.single]} />

            <DiviceSwitchShell
              desktop={<Footer statistic={statistic} />}
              mobile={null}
            />

            <InstallBannerShow statistic={statistic} />
          </Providers>
        </div>
      </body>
    </html>
  );
}
