import PharmacyHeader from "@/components/PharmacyHeader/PharmacyHeader";
import type { Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "دکترآباد | داروخانه من",
  description: "داروخانه آنلاین Doctorabad",
  manifest: "/manifest.json",
  themeColor: "#33cc33",
};
const font = localFont({
  src: "../../assets/fonts/IRANSansXV.woff2",
  variable: "--font-iran-sans",
  display: "swap",
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={font.variable} dir="rtl" lang="fa">
      <body className={font.className} >
        <PharmacyHeader title="دسته‌بندی"></PharmacyHeader>
        {children}
      </body>
    </html>
  );
}
