import localFont from "next/font/local";
import { Footer } from "@repo/shared_modules/components";
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
import BodyClassManager from "../components/BodyClassManager";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";

const font = localFont({
  src: "../assets/fonts/IRANSansXV.woff2",
  display: "swap",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = homeMetadata();
export const viewPort: Viewport = homeViewPort;
const isLoggedIn = await isUserLoggedInAsync();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const statistic = (await api.getHomeStatistics()).data.data;
  return (
    <html lang="fa">
      <SharedHeadContents />
      <body className={`${font.className}`}>
        <NextTopLoader color="#8fcc18" />
        <div className="root">
          <Providers>
            <BodyClassManager isLoggedIn={isLoggedIn} />
            {/* <Header /> */}

            {children}
            {isLoggedIn ? (
              <DiviceSwitchShell
                desktop={
                  <MobileNavBar
                    excludePaths={["pwa", "checkout", "register"]}
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

            <Footer statistic={statistic} />
          </Providers>
        </div>
      </body>
    </html>
  );
}
