import localFont from "next/font/local";
import { InstallBannerShow } from "@repo/shared_modules/components";
import { homeMetadata, homeViewPort } from "@repo/core/metadata/home";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/grid.scss";
import "../assets/styles/general.scss";
import Providers from "@/providers/providers";
import NextTopLoader from "nextjs-toploader";
import { api } from "@repo/shared_modules/api";
import MobileNavBar from "@repo/shared_modules/navbar/mobile";
import { Metadata, Viewport } from "next";
import { SharedHeadContents } from "@repo/shared_modules";
import { isUserLoggedInAsync } from "@repo/core/utils/authUtils";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";

const font = localFont({
  src: "../assets/fonts/IRANSansXV.woff2",
  display: "swap",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = homeMetadata();
export const viewport: Viewport = homeViewPort;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = await isUserLoggedInAsync();
  const statistic = (await api.getHomeStatistics()).data.data;

  return (
    <html lang="fa">
      <SharedHeadContents />
      <body className={`${font.className} market_body`}>
        <NextTopLoader color="#4fcc4c" />
        <div className="root">
          <Providers>
            {/* <BodyClassManager isLoggedIn={isLoggedIn} /> */}
            {/* <Header /> */}

            {children}
            {isLoggedIn ? (
              <DiviceSwitchShell
                desktop={
                  <MobileNavBar
                    excludePaths={["pwa", "checkout", "register", ""]}
                    onlyOnMobile={false}
                  />
                }
                mobile={<MobileNavBar />}
              />
            ) : (
              <DiviceSwitchShell
                desktop={
                  <MobileNavBar
                    excludePaths={["pwa", "checkout", "register", ""]}
                    onlyOnMobile={false}
                  />
                }
                mobile={<MobileNavBar />}
              />
            )}

            {/* <DiviceSwitchShell
              desktop={<Footer statistic={statistic} />}
              mobile={null}
            /> */}
            <InstallBannerShow statistic={statistic} />
          </Providers>
        </div>
      </body>
    </html>
  );
}
