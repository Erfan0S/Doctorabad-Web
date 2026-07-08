"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import { SearchBar as SharedSearchBar } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
import style from "./searchBar.module.scss"

type Props = {
  haveFilterButton?: boolean;
};

const SearchBar = ({ haveFilterButton }: Props) => {
  return (
    <div className={style.container}>
      <SharedSearchBar
        app={Apps.BASE}
        placeholder={"در دکترآباد جست‌و‌جو کن!"}
        haveFilterButton={false}
      />
    </div>
  );
};

export default SearchBar;
