import type { Metadata, Viewport } from "next";
import Providers from "@/providers/providers";
import localFont from "next/font/local";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/grid.scss";
import "../assets/styles/general.scss";
import { homeViewPort } from "@repo/core/metadata/home";
import { homeMetadata } from "@/metadata/home";
import { SharedHeadContents } from "@repo/shared_modules";

const font = localFont({
  src: "../assets/fonts/IRANSansXV.woff2",
  variable: "--font-iran-sans",
  display: "swap",
});

export const metadata: Metadata = homeMetadata;
export const viewport: Viewport = homeViewPort;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={font.variable} dir="rtl" lang="fa">
      <SharedHeadContents />
      <body className={`${font.className} tools_app`}>
        <div className="tools-container">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
