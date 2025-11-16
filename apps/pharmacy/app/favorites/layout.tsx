import PharmacyHeader from "@/components/PharmacyHeader/PharmacyHeader";
import {HeaderType} from "@/types/pharmacy";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دکترآباد | داروخانه من",
  description: "داروخانه آنلاین Doctorabad",
  manifest: "/manifest.json",
  themeColor: "#33cc33",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {

  return (
    <>
        <PharmacyHeader headerPageType={HeaderType.FAVORITES} title="علاقه‌مندی‌های داروخانه من"></PharmacyHeader>
        <div>{children}</div>

    </>
  );
}
