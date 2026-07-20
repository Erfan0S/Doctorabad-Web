"use client";
import { useEffect, useState } from "react";
import { FilterModalType, SelectFilterItems } from "@repo/core/types/filter";
import { useSearchParams } from "next/navigation";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import { Button } from "..";
import FilterItmeList, { createUniqueId } from "./FilterItemList";

type Props = {
  closeModal?: (clearModals?: boolean) => void;
};

export type onCheckType = (
  id: string,
  level: number,
  checked: boolean,
  children?: SelectFilterItems[],
  parentIds?: string[],
) => void;

export const SelectFilter = ({
  items,
  queryKey,
  title,
  singleSelection,
  app,
  closeModal,
  showTitle = true,
  customContent,
}: FilterModalType & Props) => {
  const [searchInList, setSearchInList] = useState("");
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});

  const params = useSearchParams();

  const changeFilters = useChangeSearchParamsFilter();

  const filter = !!queryKey && params?.get(queryKey);

  const activeItems = filter ? filter.split(",") : [];

  const filteredItems = searchInList
    ? items.filter(({ title }) => title.includes(searchInList))
    : items;

  useEffect(() => {
    activeItems.forEach((item) => {
      setChecks((prev) => ({ ...prev, [item]: true }));
    });
  }, [params]);

  const haveCheckedChildren = (
    children: SelectFilterItems[],
    checks: Record<string, boolean>,
  ): boolean => {
    return (
      children.filter((item) => {
        if (checks[item.id]) {
          return checks[item.id];
        } else if (!!item.childern?.length) {
          return haveCheckedChildren(item.childern, checks);
        }

        return false;
      }).length > 0
    );
  };

  const setItemsDefaultOpen = (items: SelectFilterItems[]) => {
    if (!!items.length && !!Object.keys(checks).length) {
      items.forEach((item) => {
        if (checks[item.id]) return;
        if (item.childern && haveCheckedChildren(item.childern, checks)) {
          const uniqueId = createUniqueId(item.id.toString(), queryKey || "");
          setIsOpen((prev) => ({
            ...prev,
            [uniqueId]: true,
          }));
          setItemsDefaultOpen(item.childern);
        }
      });
    }
  };

  useEffect(() => {
    setItemsDefaultOpen(items);
  }, [checks]);

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
    level: number,
  ): SelectFilterItems[] => {
    // if (level >= checkedLevel) return [];
    const parent = items.find((item) => ids.includes(item.id.toString()));
    if (!!parent?.childern?.length) {
      const parents = getParentsByIds(
        ids,
        parent.childern,
        checkedLevel,
        level + 1,
      );
      return [...parents, parent];
    }
    return parent ? [parent] : [];
  };

  const checkParents = (
    parentIds: string[],
    check: boolean,
    childId: string,
    level: number,
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
    parentIds?: string[],
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
    if (!queryKey) return;
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
    <div
      className={`relative max-h-[730px] w-[70vw] min-w-[200px] max-w-[500px] rounded-xl bg-white max-md:w-[90vw] ${app}`}
    >
      {showTitle && (
        <div className="w-full rounded-t-xl bg-app-base text-center leading-[37px] text-white">
          {title}
        </div>
      )}
      <div
        className={`p-4 ${singleSelection ? "[&_.itemChecked>span]:!text-black [&_.itemChecked>span]:!font-bold [&_ul_li_div]:!justify-center [&_ul_li_div_label]:w-full [&_ul_li_div_label]:!justify-center [&_ul_li_div_label]:p-0 [&_ul_li_div_label::before]:hidden [&_ul_li_div_label::after]:hidden" : ""}`}
      >
        {customContent ? (
          customContent
        ) : (
          <>
            {items.length > 10 && (
              <input
                value={searchInList}
                onChange={(e) => setSearchInList(e.target.value)}
                placeholder={`جستجو در ${title}`}
                className="mb-[10px] mt-2 w-full rounded-lg border-2 border-solid border-app-base bg-white px-2 leading-[30px] text-[#121212] outline-none"
              />
            )}
            <FilterItmeList
              items={filteredItems}
              level={0}
              checks={checks}
              onCheck={onCheck}
              queryKey={queryKey || ""}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            {!singleSelection && (
              <div className="absolute bottom-0 right-1/2 mt-4 flex translate-x-1/2 translate-y-1/2 items-center justify-center gap-[10px] px-[30px] py-[9px] [&_button]:flex-none [&_button]:px-5 [&_button]:py-[10px] [&_button]:text-[larger]">
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
          </>
        )}
      </div>
    </div>
  );
};
