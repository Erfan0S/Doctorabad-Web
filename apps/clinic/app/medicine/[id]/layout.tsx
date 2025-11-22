import PharmacyHeader from "@/components/PharmacyHeader/PharmacyHeader";
import {HeaderType} from "@/types/clinic";
import type { Metadata } from "next";

import { generateMedicineMetaData } from "@/metadata/singleMedicine";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return generateMedicineMetaData({ params });
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {

  return (
    <>
        <PharmacyHeader headerPageType={HeaderType.MEDICINE_DETAILS} title=""></PharmacyHeader>
        <div>{children}</div>

    </>
  );
}
