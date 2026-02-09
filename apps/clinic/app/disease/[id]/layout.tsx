import ClinicHeader from "@/components/ClinicHeader/ClinicHeader";
import {HeaderType} from "@/types/clinic";
import type { Metadata } from "next";

import { generateDiseaseMetaData } from "@/metadata/singleDisease";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return generateDiseaseMetaData({ params });
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {

  return (
    <>
        <ClinicHeader headerPageType={HeaderType.DISEASE_DETAILS} title=""></ClinicHeader>
        <div>{children}</div>

    </>
  );
}

