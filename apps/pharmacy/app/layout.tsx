import type { Metadata } from "next";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import localFont from "next/font/local";
import "../assets/styles/globals.scss";

const font = localFont({
  src: "../assets/fonts/IRANSansXV.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Doctorabad Pharmacy",
  description: "داروخانه آنلاین Doctorabad",
  manifest: "/manifest.json",
  themeColor: "#0070f3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body className={font.className} dir="rtl">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
