import PharmacyHeader from "@/components/PharmacyHeader/PharmacyHeader";
import type { Metadata } from "next";
import localFont from "next/font/local";

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
    <>
      <PharmacyHeader title="دسته‌بندی"></PharmacyHeader>
      {children}
    </>
  );
}
