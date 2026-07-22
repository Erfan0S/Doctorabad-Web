import type { Metadata, Viewport } from "next";
import Providers from "@/providers/providers";
import localFont from "next/font/local";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/grid.scss";
import "@repo/tailwind-config/components.css";
import { homeViewPort } from "@repo/core/metadata/home";
import { homeMetadata } from "@/metadata/home";
import MobileNavBar from "@repo/shared_modules/navbar/mobile";
import { SharedHeadContents } from "@repo/shared_modules";
import InsuranceComingSoonGate from "@/components/InsuranceComingSoonGate";

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
      <body className={font.className}>
        <div className="insurance-container">
          <Providers>
            {/* <InsuranceComingSoonGate /> */}
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
