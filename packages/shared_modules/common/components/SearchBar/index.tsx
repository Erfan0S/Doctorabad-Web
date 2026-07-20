"use client";
import SearchIcon from "@repo/shared_modules/icons/search";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useDebounceAction from "@repo/core/hooks/useDebounceAction";
import { Apps } from "@repo/core/types/general";

export type SearchBarProps = {
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
  customeFilterUrl = "/filter",
  customeSearchUrl = "/search",
  searchKey = "q",
}: SearchBarProps) => {
  const [searchText, setSearchText] = useState("");
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const debouncedSearchText = useDebounceAction(() => {
    if (searchText || pathname === customeSearchUrl) {
      router.push(`${customeSearchUrl}?${searchKey}=` + searchText);
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
    <div className={`relative mt-[10px] w-full search-bar ${app}`}>
      <div className="flex items-center max-md:justify-between">
        <div
          className={`relative w-full flex-1 [&_svg]:absolute [&_svg]:top-[calc(50%-10px)] [&_svg]:end-4 [&_svg]:text-app-base ${haveFilterButton ? "max-md:w-[calc(100%-92px)] max-md:flex-[0_0_calc(100%-92px)]" : ""}`}
        >
          <input
            type="search"
            onChange={onChange}
            value={searchText}
            placeholder={placeholder || `جست و جو کن!`}
            className="relative w-full rounded-lg border-2 border-solid border-app-base py-0 ps-4 pe-9 text-[13px] leading-9 outline-none focus:outline-none max-md:px-2"
          />
          <SearchIcon />
        </div>
        {haveFilterButton && (
          <Link
            href={`${customeFilterUrl}`}
            className="ms-2 cursor-pointer rounded-lg border-none bg-button-bg px-4 font-semibold leading-10 text-white disabled:cursor-default disabled:opacity-50"
          >
            فیلترکردن
          </Link>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
