import PharmacyHeader from "@/components/PharmacyHeader/PharmacyHeader";
import { AuthorizeClientPage } from "@repo/shared_modules/components";

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
        <PharmacyHeader title=""></PharmacyHeader>
        <div>{children}</div>

    </>
  );
}
