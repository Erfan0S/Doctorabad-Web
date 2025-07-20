import { PageHeader } from "@repo/shared_modules/headers";
import SearchBar from "@/components/Search/SearchBar";
import Search from "@/pagesComponents/Search";
import React from "react";

const SearchPage = () => {
  return (
    <div>
      <PageHeader title="جستجو" children={<SearchBar />} />
      <Search />
    </div>
  );
};

export default SearchPage;
