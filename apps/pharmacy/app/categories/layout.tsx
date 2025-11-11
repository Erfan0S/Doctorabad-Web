import PharmacyHeader from "@/components/PharmacyHeader/PharmacyHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دکترآباد | داروخانه من",
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
      <body  dir="rtl">
        <PharmacyHeader title="دسته‌بندی"></PharmacyHeader>
        {children}
      </body>
    </html>
  );
}
