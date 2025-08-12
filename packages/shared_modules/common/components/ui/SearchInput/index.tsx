"use client";
import {Apps} from "@repo/core/types/general";
import {BaseUiProps} from "@repo/core/types/props";
import style from "../uiComponents.module.scss";
import SearchIcon from "../../../../assets/svg/search";
import useDebounceAction from "@repo/core/hooks/useDebounceAction";
import {useChangeSearchParamsFilter} from "@repo/core/hooks/useChangeSearchParamsFilter";

export default function SearchInput({
  app = Apps.BASE,
  ...rest
}: BaseUiProps & React.HTMLProps<HTMLInputElement>) {
  const changeSearchParamsFilter = useChangeSearchParamsFilter();
  const debouncedSearchText = useDebounceAction((value) => {
    changeSearchParamsFilter({q: value});
  }, 750);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearchText(e.target.value);
  };

  return (
    <div className={`${style.search_input} ${style[app]}`}>
      <input placeholder="جست و جو" {...rest} onChange={onChange} />
      <SearchIcon />
    </div>
  );
}
