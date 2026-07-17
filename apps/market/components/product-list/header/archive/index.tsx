"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import { FilterParams, sortByConfigs } from "@/constants/filter";
import { OptionSwitch } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";

const SORT_LI = "me-1 cursor-pointer rounded-lg px-2 leading-10";

const ArchiveHeader = () => {
  const searchParams = useSearchParams();

  const changeFilters = useChangeSearchParamsFilter();

  const activeValues = {
    sort: searchParams?.get("sort") || sortByConfigs[0].value,
    onlyAvailable: searchParams?.get("onlyAvailable"),
  };

  return (
    <div className="market-panel mb-[30px] flex items-center justify-between px-4 py-2 font-medium max-md:mb-4 max-sm:flex-col max-sm:items-stretch max-sm:p-3">
      <span className="me-2 max-md:hidden">نمایش بر اساس:</span>
      <ul className="m-0 flex list-none items-center p-0 max-xl:hidden">
        {sortByConfigs.map(({ title, value }) => (
          <li
            key={value}
            className={
              value === activeValues.sort ? `${SORT_LI} bg-[#ffd8a6]` : SORT_LI
            }
            onClick={() => changeFilters({ sort: value })}
          >
            {title}
          </li>
        ))}
      </ul>
      <select
        className="hidden h-[35px] rounded-lg border-2 border-solid border-gray px-2 max-xl:block max-sm:mb-3"
        value={activeValues.sort}
        onChange={(e) =>
          changeFilters({ sort: (e.target as HTMLSelectElement).value })
        }
      >
        {sortByConfigs.map(({ title, value }) => (
          <option key={value} value={value}>
            {title}
          </option>
        ))}
      </select>
      <OptionSwitch
        name={FilterParams.OnlyAvailable}
        title="فقط کالا‌های موجود"
        app={Apps.MARKET}
        addToQuery
        className="max-w-[200px]"
      />
    </div>
  );
};
export default ArchiveHeader;
