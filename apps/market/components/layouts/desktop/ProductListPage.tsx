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
      <div className="flex flex-wrap -mx-[15px]">
        {FilterComponent && (
          <div className="relative w-full px-[15px] xl:flex-[0_0_25%] xl:max-w-[25%]">
            <FilterComponent />
          </div>
        )}
        <div className={`relative w-full px-[15px] ${FilterComponent ? "xl:flex-[0_0_75%] xl:max-w-[75%]" : "xl:flex-[0_0_100%] xl:max-w-[100%]"}`}>
          <ProductListHeader />
          <ArchiveList hasFilterSideBar={!!FilterComponent} />
        </div>
      </div>
    </div>
  );
}

export default DesktopProductListPage;
