import SelectFilters from "@/components/common/SelectFilters/SelectFilters";
import SingleList from "@/components/singlesList";
import SingleFilters from "@/components/singlesList/filters";
import AppQueryClientProvider from "@/providers/queryClientProvider";
import React from "react";

function SingleListPage() {
  return (
    <AppQueryClientProvider>
      <div className="container">
        <SingleFilters />
        <SingleList />
      </div>
    </AppQueryClientProvider>
  );
}

export default SingleListPage;
