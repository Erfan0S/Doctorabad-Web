import SelectFilters from "@/components/common/SelectFilters/SelectFilters";
import SingleList from "@/components/singlesList";
import SingleFilters from "@/components/singlesList/filters";
import React from "react";

function SingleListPage() {
  return (
    <div className="container">
      <SingleFilters />
      <SingleList />
    </div>
  );
}

export default SingleListPage;
