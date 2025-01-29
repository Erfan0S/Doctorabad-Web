import ArchiveHeader from "@/components/product-list/header/archive";
import ArchiveList from "@/components/product-list/productList";
import { generateProductListMetaData } from "@/metadata/archiveProduct";
import ArchiveFiltersContainer from "@/components/product-list/filters/archive/archiveFilterContainer";
import SearchFilters from "@/components/product-list/filters/search/search";
import { ProductListProps, ProductListType } from "@repo/core/types";
import { ProductListHeader } from "@/components/product-list/header/ProductListHeader";

export const generateMetadata = generateProductListMetaData;

export default async function ProductList({ params }: ProductListProps) {
  const getFilterComponent = () => {
    switch (params.type) {
      case ProductListType.SEARCH:
        return SearchFilters;

      case ProductListType.ARCHIVE:
        return ArchiveFiltersContainer;

      default:
        return null;
    }
  };
  const FilterComponent = getFilterComponent();

  return (
    <div className="container">
      <div className="row">
        {FilterComponent && (
          <div className="col-xl-3">
            <FilterComponent />
          </div>
        )}
        <div className={`col-xl-${FilterComponent ? "9" : "12"}`}>
          <ProductListHeader />
          <ArchiveList hasFilterSideBar={!!FilterComponent} />
        </div>
      </div>
    </div>
  );
}
