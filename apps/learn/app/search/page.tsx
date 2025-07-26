import { PageHeader } from "@repo/shared_modules/headers";
import SearchBar from "@/components/Search/SearchBar";
import Search from "@/pagesComponents/Search";
import React from "react";
import { Apps } from "@repo/core/types/general";

const SearchPage = () => {
  return (
    <div>
      <PageHeader app={Apps.LEARN} title="جستجو" children={<SearchBar />} />
      <Search />
    </div>
  );
};

export default SearchPage;
