"use client";
import style from "./Filters.module.scss";
import {useState} from "react";
import {FilterModalType} from "@repo/core/types/filter";
import {useSearchParams} from "next/navigation";
import {useChangeSearchParamsFilter} from "@repo/core/hooks/useChangeSearchParamsFilter";
import Loading from "../loading";

type Props = {
  closeModal?: (clearModals?: boolean) => void;
};

export const SelectFilter = ({
  items,
  queryKey,
  title,
  singleSelection,
  app,
  closeModal,
}: FilterModalType & Props) => {
  const [searchInList, setSearchInList] = useState("");

  const params = useSearchParams();

  const changeFilters = useChangeSearchParamsFilter();

  const filter = params.get(queryKey);

  const activeItems = filter ? filter.split(",") : [];

  const filteredItems = searchInList
    ? items.filter(({title}) => title.includes(searchInList))
    : items;

  const changeCategoryFilter = (
    filterId: number | string,
    checked: boolean
  ) => {
    const updatedItems = checked
      ? [...(singleSelection ? [] : activeItems), String(filterId)]
      : activeItems.filter((item) => item !== String(filterId));

    setTimeout(() => {
      changeFilters({
        [queryKey]: updatedItems.length ? updatedItems.join(",") : null,
      });
    }, 100);

    if (closeModal) closeModal();
  };

  return (
    <div className={`${style.archiveFiltersCheckboxList} ${style[app]}`}>
      {items.length > 10 && (
        <input
          value={searchInList}
          onChange={(e) => setSearchInList(e.target.value)}
          placeholder={`جستجو در ${title}`}
        />
      )}
      <ul>
        {filteredItems.map(({id, title}) => {
          const uniqueId = `checkbox_${queryKey}_${id}_id`;
          return (
            <li key={id}>
              <input
                id={uniqueId}
                type="checkbox"
                checked={activeItems.includes(String(id))}
                onChange={(e) => changeCategoryFilter(id, e.target.checked)}
              />
              <label htmlFor={uniqueId}>
                <span>{title}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
