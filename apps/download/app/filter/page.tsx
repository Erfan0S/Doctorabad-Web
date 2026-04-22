import { PageHeader } from "@repo/shared_modules/headers";
import Filters from "@/components/Search/Filters";
import FilterPageList from "@/pagesComponents/Filter";
import React from "react";
import { Apps } from "@repo/core/types/general";

const SearchPage = () => {
  return (
    <div>
      <PageHeader app={Apps.DOWNLOAD} title="فیلتر کردن" children={<Filters />} />
      <FilterPageList />
    </div>
  );
};

export default SearchPage;
