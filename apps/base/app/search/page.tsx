import { PageHeader } from "@repo/shared_modules/headers";
import SearchBar from "@/components/Search/SearchBar";
import SearchHistoryList from "@/components/Search/SearchHistoryList";
import PopularSearchList from "@/components/Search/PopularSearchList";
import SearchPageComponent from "@/components/Search/SearchPage";
import React from "react";
import { Apps } from "@repo/core/types/general";

const SearchPage = () => {
  return (
    <div>
      <PageHeader
        app={Apps.BASE}
        title="جستجو"
        children={
          <div style={{ paddingLeft: "10px" , paddingRight: "10px" }}>
            <SearchBar />
          </div>
        }
      />

      <SearchHistoryList />
      <SearchPageComponent />
      <PopularSearchList />
    </div>
  );
};

export default SearchPage;
