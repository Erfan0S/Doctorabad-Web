import ArchiveList from "@/components/product-list/productList";
import { generateProductListMetaData } from "@/metadata/archiveProduct";
import ArchiveFiltersContainer from "@/components/product-list/filters/archive/archiveFilterContainer";
import SearchFilters from "@/components/product-list/filters/search/search";
import { ProductListProps, ProductListType } from "@repo/core/types/product";
import { ProductListHeader } from "@/components/product-list/header/ProductListHeader";
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
