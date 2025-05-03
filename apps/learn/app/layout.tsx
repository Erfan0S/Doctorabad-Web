import localFont from "next/font/local";
// import Header from "../components/common/header";
// import Footer from "@/components/common/footer";
// import { homeMetadata, homeViewPort } from "@/metadata/home";

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
import { homeMetadata, homeViewPort } from "@repo/core/metadata/home";

const font = localFont({
  src: "../assets/fonts/IRANSansXV.woff2",
  display: "swap",
  variable: "--font-iran-sans",
});

export const metadata = homeMetadata;
export const viewPort = homeViewPort;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const statistic = (await api.getHomeStatistics()).data.data;
  return (
    <html lang="fa">
      <Script
        id="clarity-load"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "p86us2vume");`,
        }}
      />
      <Script
        strategy="beforeInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-XCPDF4Z963"
        async
      />
      <Script
        strategy="beforeInteractive"
        id="gtm"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XCPDF4Z963');
        `,
        }}
      />
      <body className={`${font.className} ${font.variable}`}>
        <NextTopLoader color="#f54f1a" />
        <div className="root">
          <Providers>
            <Suspense fallback={<div></div>}>
              <div className="learn-container">
                {children}
                <MobileNavBar excludePaths={["checkout", "course"]} />
              </div>
            </Suspense>
            {/* <Footer statistic={statistic} /> */}
            <InstallBannerShow statistic={statistic} />
          </Providers>
        </div>
      </body>
    </html>
  );
}
