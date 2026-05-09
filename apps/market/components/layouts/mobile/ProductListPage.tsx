import ProductList from "@/components/product-list/productList";
import { FilterParams } from "@/constants/filter";
import { marketPaths } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";
import { ProductListType } from "@repo/core/types/product";
import { SearchBar } from "@repo/shared_modules/components";
import { PageHeader } from "@repo/shared_modules/headers";
import React from "react";

function MobileProductListPage({ type }: { type: ProductListType }) {
  // TODO: fix screen overflow
  // TODO: continue from here
  return (
    <div>
      <PageHeader
        app={Apps.MARKET}
        title="جستجو"
        children={
          <SearchBar
            app={Apps.MARKET}
            haveFilterButton={false}
            searchKey={FilterParams.SEARCH}
            customeSearchUrl={marketPaths.search}
          />
        }
      />
      <ProductList hasFilterSideBar={false} />
    </div>
  );
}

export default MobileProductListPage;
