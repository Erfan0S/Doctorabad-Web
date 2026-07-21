import Accordion from "@/components/app/accordion";
import { useSearchParams } from "next/navigation";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import { useState } from "react";

// custom checkbox: hide the input (peer), draw the box with label::before
// and the checkmark with label::after (preflight is off, so border widths
// must be explicit on every side)
const CHECKBOX_LABEL =
  "relative mb-0 flex w-full cursor-pointer items-center justify-between ps-6 leading-10 before:absolute before:start-0 before:top-1/2 before:h-4 before:w-4 before:-translate-y-1/2 before:rounded before:border before:border-solid before:border-[#eee] before:content-[''] after:absolute after:start-1 after:top-1/2 after:h-[5px] after:w-2 after:border-0 after:border-b after:border-l after:border-solid after:border-white after:content-[''] after:[transform:translateY(calc(-50%-1px))_rotate(-45deg)] peer-checked:before:border-orange peer-checked:before:bg-orange";

type Props = {
  title: string;
  items: { id: number; title: string }[];
  queryKey: string;
  singleSelection?: boolean;
};

export const SelectFilter = ({
  items,
  queryKey,
  title,
  singleSelection,
}: Props) => {
  const [searchInList, setSearchInList] = useState("");

  const searchParams = useSearchParams();

  const changeFilters = useChangeSearchParamsFilter();

  const filter = searchParams?.get(queryKey);

  const activeItems = filter ? filter.split(",") : [];

  const filteredItems = searchInList
    ? items.filter(({ title }) => title.includes(searchInList))
    : items;

  const changeCategoryFilter = (filterId: number, checked: boolean) => {
    const updatedItems = checked
      ? [...(singleSelection ? [] : activeItems), String(filterId)]
      : activeItems.filter((item) => item !== String(filterId));

    changeFilters({
      [queryKey]: updatedItems.length ? updatedItems.join(",") : null,
    });
  };

  return (
    <Accordion title={title} isActive={!!filter}>
      <div>
        {items.length > 10 && (
          <input
            className="mb-[10px] mt-2 w-full rounded-lg border-2 border-solid border-orange bg-white px-2 leading-[30px] text-[#121212] outline-none"
            value={searchInList}
            onChange={(e) => setSearchInList(e.target.value)}
            placeholder={`جستجو در ${title}`}
          />
        )}
        <ul className="market-orange-scrollbar my-[5px] max-h-[300px] list-none overflow-auto p-0">
          {filteredItems.map(({ id, title }) => {
            const uniqueId = `checkbox_${queryKey}_${id}_id`;
            return (
              <li
                key={id}
                className="border-0 border-b border-solid border-[#eee]"
              >
                <input
                  className="peer hidden"
                  id={uniqueId}
                  type="checkbox"
                  checked={activeItems.includes(String(id))}
                  onChange={(e) => changeCategoryFilter(id, e.target.checked)}
                />
                <label htmlFor={uniqueId} className={CHECKBOX_LABEL}>
                  <span className="font-semibold text-[#777]">{title}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </Accordion>
  );
};
