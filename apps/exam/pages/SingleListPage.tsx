import SingleList from "@/components/singlesList";
import SingleFilters from "@/components/singlesList/filters";
import { PersistQueryProvider } from "@repo/shared_modules";
import React from "react";

function SingleListPage() {
  return (
    <PersistQueryProvider>
      <div className="container">
        <SingleFilters />
        <SingleList />
      </div>
    </PersistQueryProvider>
  );
}

export default SingleListPage;
