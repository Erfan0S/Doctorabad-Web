import PageHeader from "@/components/Header/PageHeader";
import SearchBar from "@/components/Search/SearchBar";
import Search from "@/pages/Search";
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
