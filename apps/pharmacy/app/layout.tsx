import type { Metadata } from "next";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import localFont from "next/font/local";
import "../assets/styles/globals.scss";

const font = localFont({
  src: "../assets/fonts/IRANSansXV.woff2",
  variable: "--font-iran-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "دکترآباد | داروخانه من",
  description: "داروخانه آنلاین Doctorabad",
  manifest: "/manifest.json",
  themeColor: "#33cc33",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={font.variable} dir="rtl" lang="fa">
      <body className={font.className} >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
