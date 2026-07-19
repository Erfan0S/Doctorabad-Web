"use client";
import {Apps} from "@repo/core/types/general";
import {BaseUiProps} from "@repo/core/types/props";
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
    <div className={`relative w-full focus:overflow-hidden [&_input]:w-full [&_input]:rounded-[10px] [&_input]:border-2 [&_input]:border-solid [&_input]:border-app-base [&_input]:px-[12px] [&_input]:py-[6px] [&_input]:pe-[30px] [&_input]:outline-none [&_input]:[font-size:larger] [&_svg]:absolute [&_svg]:end-[10px] [&_svg]:top-1/2 [&_svg]:-translate-y-1/2 [&_svg]:text-[#969696] ${app}`}>
      <input placeholder="جست و جو" {...rest} onChange={onChange} />
      <SearchIcon />
    </div>
  );
}
