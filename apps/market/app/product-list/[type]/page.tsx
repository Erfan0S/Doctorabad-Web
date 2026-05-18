import { generateProductListMetaData } from "@/metadata/archiveProduct";
import { ProductListProps } from "@repo/core/types/product";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import DesktopProductListPage from "@/components/layouts/desktop/ProductListPage";
import MobileProductListPage from "@/components/layouts/mobile/ProductListPage";

export const generateMetadata = generateProductListMetaData;

export default async function ProductList({ params }: ProductListProps) {
  return (
    <DiviceSwitchShell
      desktop={<DesktopProductListPage type={params.type} />}
      mobile={<MobileProductListPage type={params.type} />}
    />
  );
}
