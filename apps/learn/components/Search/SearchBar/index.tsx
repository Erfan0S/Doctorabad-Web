"use client";
import SearchIcon from "@/assets/svg/search";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import style from "./SearchBar.module.scss";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [showResults, setShowResults] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowResults(false);
    setSearchText(e.target.value);
  };

  return (
    <div className={`${style.search} search-bar`}>
      <div className={style.searchForm}>
        <div className={style.searchFormInput}>
          <input
            type="search"
            onFocus={() => null}
            onChange={onChange}
            placeholder={`در مباحث ${1234} درس جست و جو کن!`}
          />
          <SearchIcon />
        </div>
        <Link href={"#"}>فیلترکردن</Link>
      </div>
    </div>
  );
};

export default SearchBar;
