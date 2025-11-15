import PharmacyHeader from "@/components/PharmacyHeader/PharmacyHeader";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { pharmacyApi } from "@/api/Api";
import {
  authorizeServerPage,
} from "@repo/core/utils/authUtils";
import {MedicineDetails} from "@/types/pharmacy"
export const metadata: Metadata = {
  title: "دکترآباد | داروخانه من",
  description: "داروخانه آنلاین Doctorabad",
  manifest: "/manifest.json",
  themeColor: "#33cc33",
};
const font = localFont({
  src: "../../../assets/fonts/IRANSansXV.woff2",
  variable: "--font-iran-sans",
  display: "swap",
});

export default async function RootLayout({
  children, params 
}: {
  children: (props: { data: MedicineDetails }) => React.ReactNode;
  params: { id: string };
}) {
  await authorizeServerPage();
  const id = Number(params.id);
  const res = await pharmacyApi.getMedicineDetails(id);
  const data = res.data.data;
  return (
    <html className={font.variable} dir="rtl" lang="fa">
      <body className={font.className}>
        <PharmacyHeader title="دارو"></PharmacyHeader>
        {children({data})}
      </body>
    </html>
  );
}
