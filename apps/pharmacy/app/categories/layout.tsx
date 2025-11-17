import PharmacyHeader from "@/components/PharmacyHeader/PharmacyHeader";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { HeaderType } from "@/types/pharmacy";

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
    <>
      <PharmacyHeader headerPageType={HeaderType.OTHERS} title="دسته‌بندی"></PharmacyHeader>
      {children}
    </>
  );
}
