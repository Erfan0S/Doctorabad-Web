"use client";

import Link from "next/link";
import style from "../ArchiveHeader.module.scss";
import { useSearchParams } from "next/navigation";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import { FilterParams, sortByConfigs } from "@/constants/filter";
import { OptionSwitch } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";

const ArchiveHeader = () => {
  const searchParams = useSearchParams();

  const changeFilters = useChangeSearchParamsFilter();

  const activeValues = {
    sort: searchParams?.get("sort") || sortByConfigs[0].value,
    onlyAvailable: searchParams?.get("onlyAvailable"),
  };

  return (
    <div className={style.archiveHeader}>
      <span>نمایش بر اساس:</span>
      <ul>
        {sortByConfigs.map(({ title, value }) => (
          <li
            key={value}
            className={value === activeValues.sort ? style.active : undefined}
            onClick={() => changeFilters({ sort: value })}
          >
            {title}
          </li>
        ))}
      </ul>
      <select
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
        className={style.archiveHeaderOnlyAvailable}
      />
    </div>
  );
};
export default ArchiveHeader;
