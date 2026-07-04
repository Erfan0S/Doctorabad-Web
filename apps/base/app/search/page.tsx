import { PageHeader } from "@repo/shared_modules/headers";
import SearchBar from "@/components/Search/SearchBar";
import SearchPageComponent from "@/components/Search/SearchPage";
import React from "react";
import { Apps } from "@repo/core/types/general";

const SearchPage = () => {
  return (
    <div>
      <PageHeader app={Apps.BASE} title="جستجو" children={<SearchBar />} />
      <SearchPageComponent />
    </div>
  );
};

export default SearchPage;
