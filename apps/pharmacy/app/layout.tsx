import type { Metadata } from "next";
import Providers from "@/providers/providers";
import localFont from "next/font/local";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/grid.scss";
import "../assets/styles/general.scss";

const font = localFont({
  src: "../assets/fonts/IRANSansXV.woff2",
  variable: "--font-iran-sans",
  display: "swap",
});

// export const viewport: Metadata = {
//   title: "دکترآباد | داروخانه من",
//   description: "داروخانه آنلاین Doctorabad",
//   manifest: "/manifest.webmanifest",
//   themeColor: "#33cc33",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={font.variable} dir="rtl" lang="fa">
      <body className={font.className} >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
