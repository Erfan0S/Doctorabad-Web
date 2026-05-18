import { authorizeServerPage } from "@repo/core/utils/authUtils";
import BuyInsurancePage from "@/components/BuyInsurancePage/BuyInsurancePage";
import { generateInsuranceMetaData } from "@/metadata/singleInsurance";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  return generateInsuranceMetaData({ searchParams });
}

export default async function Insurance() {
  await authorizeServerPage();
  return <BuyInsurancePage />;
}

