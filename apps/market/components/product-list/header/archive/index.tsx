"use client";

import Link from "next/link";
import style from "../ArchiveHeader.module.scss";
import { useSearchParams } from "next/navigation";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";

const sortByConfigs = [
  { title: "جدیدترین‌ها", value: "newest" },
  { title: "پرفروش ترین ها", value: "bestselling" },
  { title: "محبوب ترین", value: "favorite" },
  { title: "ارزان ترین", value: "cheapest" },
  { title: "گران ترین", value: "expensive" },
];

const ArchiveHeader = () => {
  const searchParams = useSearchParams();

  const changeFilters = useChangeSearchParamsFilter();

  const activeValues = {
    sort: searchParams.get("sort") || sortByConfigs[0].value,
    onlyAvailable: searchParams.get("onlyAvailable"),
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
      <div className={style.archiveHeaderOnlyAvailable}>
        <span>فقط کالاهای موجود</span>
        <input
          type="checkbox"
          name="onlyAvailable"
          id="onlyAvailable"
          checked={!!Number(activeValues.onlyAvailable)}
          onChange={(e) =>
            changeFilters({ onlyAvailable: String(Number(e.target.checked)) })
          }
        />
        <label htmlFor="onlyAvailable"></label>
      </div>
    </div>
  );
};
export default ArchiveHeader;
