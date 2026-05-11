"use client";
import SearchIcon from "@repo/shared_modules/icons/search";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import style from "./SearchBar.module.scss";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useDebounceAction from "@repo/core/hooks/useDebounceAction";
import { Apps } from "@repo/core/types/general";

type Props = {
  app?: Apps;
  haveFilterButton?: boolean;
  placeholder?: string;
  customeFilterUrl?: string;
  customeSearchUrl?: string;
  searchKey?: string;
};

const SearchBar = ({
  app = Apps.BASE,
  haveFilterButton = true,
  placeholder,
  customeFilterUrl,
  customeSearchUrl,
  searchKey = "q",
}: Props) => {
  const [searchText, setSearchText] = useState("");
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const debouncedSearchText = useDebounceAction(() => {
    if (searchText || pathname === (customeSearchUrl || "/search")) {
      router.push(
        `${customeSearchUrl || "/search"}?${searchKey}=` + searchText,
      );
    }
  }, 750);

  useEffect(() => {
    debouncedSearchText();
  }, [searchText]);

  useEffect(() => {
    setSearchText(params?.get(searchKey) || "");
  }, [params]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className={`${style.search} search-bar ${style[app]}`}>
      <div className={style.searchForm}>
        <div
          className={`${style.searchFormInput} ${haveFilterButton ? style.searchFormInputWithFilterButton : ""}`}
        >
          <input
            type="search"
            onChange={onChange}
            value={searchText}
            placeholder={placeholder || `جست و جو کن!`}
          />
          <SearchIcon />
        </div>
        {haveFilterButton && (
          <Link href={`${customeFilterUrl || "/filter"}`}>فیلترکردن</Link>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
