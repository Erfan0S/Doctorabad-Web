"use client";
import style from "./Filters.module.scss";
import { useEffect, useState } from "react";
import { FilterModalType, SelectFilterItems } from "@repo/core/types/filter";
import { useSearchParams } from "next/navigation";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import ArrowRight from "../../../assets/svg/arrowRight";
import ArrowBottom from "../../../assets/svg/arrowBottom";
import { Button } from "..";
import FilterItmeList from "./FilterItemList";

type Props = {
  closeModal?: (clearModals?: boolean) => void;
};

export type onCheckType = (
  id: string,
  level: number,
  checked: boolean,
  children?: SelectFilterItems[],
  parentIds?: string[]
) => void;

export const SelectFilter = ({
  items,
  queryKey,
  title,
  singleSelection,
  app,
  closeModal,
}: FilterModalType & Props) => {
  const [searchInList, setSearchInList] = useState("");
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});

  const params = useSearchParams();

  const changeFilters = useChangeSearchParamsFilter();

  const filter = params?.get(queryKey);

  const activeItems = filter ? filter.split(",") : [];

  const filteredItems = searchInList
    ? items.filter(({ title }) => title.includes(searchInList))
    : items;

  useEffect(() => {
    activeItems.forEach((item) => {
      setChecks((prev) => ({ ...prev, [item]: true }));
    });
  }, [params]);

  const checkChildren = (children: SelectFilterItems[], check: boolean) => {
    children.forEach((child) => {
      setChecks((prev) => ({ ...prev, [child.id]: check }));
      if (child.childern && child.childern.length > 0)
        checkChildren(child.childern, check);
    });
  };

  const getParentsByIds = (
    ids: string[],
    items: SelectFilterItems[],
    checkedLevel: number,
    level: number
  ): SelectFilterItems[] => {
    // if (level >= checkedLevel) return [];
    const parent = items.find((item) => ids.includes(item.id.toString()));
    if (!!parent?.childern?.length) {
      const parents = getParentsByIds(
        ids,
        parent.childern,
        checkedLevel,
        level + 1
      );
      return [...parents, parent];
    }
    return parent ? [parent] : [];
  };

  const checkParents = (
    parentIds: string[],
    check: boolean,
    childId: string,
    level: number
  ) => {
    if (!parentIds.length) return;
    if (!check) {
      parentIds.forEach((parentId) => {
        setChecks((prev) => ({ ...prev, [parentId]: false }));
      });
    } else {
      const parents = getParentsByIds(parentIds, items, level, 0);

      parents.forEach((parent, i) => {
        const childrenChecked = parent.childern?.every((child) => {
          return (
            checks[child.id] ||
            child.id == childId ||
            child.id == parentIds.reverse()[i - 1]
          );
        });

        if (childrenChecked) {
          setChecks((prev) => ({ ...prev, [parent.id]: check }));
        }
      });
    }
  };

  const onCheck: onCheckType = (
    id: string,
    level: number,
    checked: boolean,
    children?: SelectFilterItems[],
    parentIds?: string[]
  ) => {
    if (singleSelection) {
      setChecks({ [id]: checked });
      changeCategoryFilter({ [id]: checked });
      if (closeModal) closeModal();
    } else {
      setChecks((prev) => ({ ...prev, [id]: checked }));
      checkChildren(children || [], checked);
      checkParents(parentIds || [], checked, id, level);
    }
  };

  const changeCategoryFilter = (item: Record<string, boolean>) => {
    const updatedItems = Object.keys(item).filter((key) => item[key]);
    setTimeout(() => {
      changeFilters({
        [queryKey]: updatedItems.length ? updatedItems.join(",") : null,
      });
    }, 100);
  };

  const onSubmit = () => {
    changeCategoryFilter(checks);
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
      <FilterItmeList
        items={filteredItems}
        level={0}
        checks={checks}
        onCheck={onCheck}
        queryKey={queryKey}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {!singleSelection && (
        <div className={style.submitFilters}>
          <Button type="button" app={app} onClick={onSubmit}>
            تایید
          </Button>
          {/* <Button
            type="button"
            app={app}
            onClick={() => {
              setChecks({});
              changeCategoryFilter({});
              closeModal && closeModal();
            }}
            variant="outline"
          >
            حذف فیلترها
          </Button> */}
        </div>
      )}
    </div>
  );
};
