import ArchiveFiltersContainer from "@/components/product-list/filters/archive/archiveFilterContainer";
import SearchFilters from "@/components/product-list/filters/search/search";
import { ProductListHeader } from "@/components/product-list/header/ProductListHeader";
import { ProductListType } from "@repo/core/types/product";
import React from "react";
import ArchiveList from "@/components/product-list/productList";

function DesktopProductListPage({ type }: { type: ProductListType }) {
  const getFilterComponent = () => {
    switch (type) {
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

export default DesktopProductListPage;
