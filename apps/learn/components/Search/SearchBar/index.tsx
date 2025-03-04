"use client";
import SearchIcon from "@/assets/svg/search";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import style from "./SearchBar.module.scss";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import useDebounceAction from "@repo/core/hooks/useDebounceAction";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const debouncedSearchText = useDebounceAction(() => {
    if (searchText || pathname === "/learn/search") {
      router.push("/learn/search?q=" + searchText);
    }
  }, 750);

  const { data, isLoading } = useQuery({
    queryKey: ["search_count"],
    queryFn: () => api.getLessonsCount(),
  });

  useEffect(() => {
    debouncedSearchText();
  }, [searchText]);

  useEffect(() => {
    setSearchText(params?.get("q") || "");
  }, [params]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className={`${style.search} search-bar`}>
      <div className={style.searchForm}>
        <div className={style.searchFormInput}>
          <input
            type="search"
            onChange={onChange}
            value={searchText}
            placeholder={`در مباحث ${data?.data.data || 10000} درس جست و جو کن!`}
          />
          <Link href={"/learn/search?q=" + searchText}>
            <SearchIcon />
          </Link>
        </div>
        <Link href={"/learn/filter"}>فیلترکردن</Link>
      </div>
    </div>
  );
};

export default SearchBar;
