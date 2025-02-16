import PageHeader from "@/components/Header/PageHeader";
import Filters from "@/components/Search/Filters";
import React from "react";

const SearchPage = () => {
  return (
    <div>
      <PageHeader title="فیلتر کردن" children={<Filters />} />
    </div>
  );
};

export default SearchPage;
