"use client";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import useDebounceAction from "@repo/core/hooks/useDebounceAction";

const SearchFilters = () => {
  const searchParams = useSearchParams();

  const changeFilters = useChangeSearchParamsFilter();

  const search = searchParams?.get("search");

  const [searchText, setSearchText] = useState(() => search || "");

  const changeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const changeSearchParam = useCallback(
    (search: string | null) => {
      if (search) changeFilters({ search: search });
    },
    [changeFilters],
  );

  const DebounceChangeSearchParam = useDebounceAction(changeSearchParam, 1000);

  useEffect(() => {
    DebounceChangeSearchParam(searchText);
  }, [searchText]);

  useEffect(() => {
    setSearchText(search!);
  }, [search]);

  return (
    <aside className="market-panel market-orange-scrollbar sticky top-[168px] mb-10 max-h-[730px] overflow-auto p-6 max-md:mb-4">
      {/* faithful to the old scss: the search filter had no mobile toggle,
          so its content is simply hidden below xl */}
      <div className="max-xl:hidden max-xl:pt-3">
        <span className="font-semibold">جستجو</span>
        <div>
          <input
            className="mb-[10px] mt-2 w-full rounded-lg border-2 border-solid border-orange bg-white px-2 leading-[30px] text-[#121212] outline-none"
            value={searchText}
            onChange={changeSearchText}
            placeholder="نام محصول"
          />
        </div>
      </div>
    </aside>
  );
};
export default SearchFilters;
