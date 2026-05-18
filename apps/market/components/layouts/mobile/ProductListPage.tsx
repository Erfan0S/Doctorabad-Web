import MobileFilterContainer from "@/components/product-list/filters/archive/MobileFilterContainer";
import ProductList from "@/components/product-list/productList";
import { FilterParams } from "@/constants/filter";
import { marketPaths } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";
import { ProductListType } from "@repo/core/types/product";
import { SearchBar } from "@repo/shared_modules/components";
import { PageHeader } from "@repo/shared_modules/headers";
import React from "react";

function MobileProductListPage({ type }: { type: ProductListType }) {
  const GetListTitle = () => {
    switch (type) {
      case ProductListType.ARCHIVE:
        return "فیلتر کردن";
      case ProductListType.SEARCH:
        return "جستجو";
      case ProductListType.AMAZING:
        return "شگفت انگیزها";
      case ProductListType.NEWEST:
        return "جدیدترین‌ها";
      case ProductListType.SUGGESTED:
        return "پیشنهاد کدخدای دکترآباد";
      case ProductListType.BEST_SELLING:
        return "پرفروش‌ترین‌ها";
      case ProductListType.FESTIVAL:
        return "جشنواره‌ها";
    }
  };

  const PageHeaderChildren = () =>
    type == ProductListType.SEARCH ? (
      <SearchBar
        app={Apps.MARKET}
        haveFilterButton={false}
        searchKey={FilterParams.SEARCH}
        customeSearchUrl={marketPaths.search}
      />
    ) : type == ProductListType.ARCHIVE ? (
      <MobileFilterContainer />
    ) : null;

  return (
    <div>
      <PageHeader
        app={Apps.MARKET}
        title={GetListTitle()}
        children={PageHeaderChildren()}
      />
      <ProductList hasFilterSideBar={false} mobileView />
    </div>
  );
}

export default MobileProductListPage;
