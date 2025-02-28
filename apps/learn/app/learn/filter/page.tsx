import PageHeader from "@/components/Header/PageHeader";
import Filters from "@/components/Search/Filters";
import FilterPageList from "@/pagesComponents/Filter";
import React from "react";

const SearchPage = () => {
  return (
    <div>
      <PageHeader title="فیلتر کردن" children={<Filters />} />
      <FilterPageList />
    </div>
  );
};

export default SearchPage;
