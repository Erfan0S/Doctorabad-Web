import { SelectFilterItems } from "@repo/core/types/filter";
import ArrowBottom from "../../../assets/svg/arrowBottom";
import ArrowRight from "../../../assets/svg/arrowRight";
import { Dispatch, SetStateAction } from "react";
import { onCheckType } from ".";

export const createUniqueId = (id: string, queryKey: string) =>
  `checkbox_${queryKey}_${id}_id`;

type Props = {
  items: SelectFilterItems[];
  level: number;
  parentIds?: string[];
  onCheck: onCheckType;
  checks: Record<string, boolean>;
  queryKey: string;
  isOpen: Record<string, boolean>;
  setIsOpen: Dispatch<SetStateAction<Record<string, boolean>>>;
};

const FilterItmeList = ({
  items,
  level,
  parentIds,
  checks,
  onCheck,
  queryKey,
  isOpen,
  setIsOpen,
}: Props) => {
  return (
    <ul
      className={`mx-0 my-[5px] w-full list-none p-0 [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-track]:border-[10px] [&::-webkit-scrollbar-track]:border-solid [&::-webkit-scrollbar-track]:border-white [&::-webkit-scrollbar-track]:bg-[#ccc] [&::-webkit-scrollbar-thumb]:w-[25px] [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-white [&::-webkit-scrollbar-thumb]:border-0 [&::-webkit-scrollbar-thumb]:border-l-[9px] [&::-webkit-scrollbar-thumb]:border-r-[9px] [&::-webkit-scrollbar-thumb]:bg-app-base [&::-webkit-scrollbar]:w-[25px] [&::-webkit-scrollbar]:rounded-lg ${level === 0 ? "max-h-[400px] select-none overflow-auto" : "px-[15px]"}`}
    >
      {items.map(({ id, title, childern }, i) => {
        const uniqueId = createUniqueId(id.toString(), queryKey);
        return (
          <li
            key={uniqueId}
            className={`flex flex-row flex-wrap items-center justify-between border-solid border-[#eee] border-0 border-t ${level === 0 ? "first:border-none" : ""}`}
          >
            <div className="flex w-full flex-row items-center justify-between">
              <input
                id={uniqueId}
                type="checkbox"
                checked={checks[id] || false}
                onChange={(e) =>
                  onCheck(
                    id.toString(),
                    level,
                    !checks[id],
                    childern,
                    parentIds,
                  )
                }
                className="hidden [&:checked+label::before]:bg-app-base [&:checked+label::before]:border-app-base"
              />
              <label
                className={`relative mb-0 flex cursor-pointer items-center justify-between ps-6 leading-10 before:absolute before:start-0 before:top-1/2 before:h-4 before:w-4 before:-translate-y-1/2 before:rounded-[4px] before:border before:border-solid before:border-[#eee] before:content-[''] after:absolute after:start-[4px] after:top-1/2 after:h-[5px] after:w-2 after:translate-y-[calc(-50%-1px)] after:-rotate-45 after:border-solid after:border-white after:border-0 after:border-b after:border-l after:content-[''] ${checks[id] ? "itemChecked" : ""}`}
                htmlFor={uniqueId}
              >
                <span className="font-semibold text-[#777]">{title}</span>
              </label>
              {!!childern?.length && (
                <span
                  onClick={() =>
                    setIsOpen((prev) => ({
                      ...prev,
                      [uniqueId]: !prev[uniqueId],
                    }))
                  }
                  className="[&_svg]:h-auto [&_svg]:w-5 [&_svg]:cursor-pointer [&_svg]:text-[purple]"
                >
                  {isOpen[uniqueId] ? <ArrowBottom /> : <ArrowRight />}
                </span>
              )}
            </div>
            {isOpen[uniqueId] && !!childern?.length && (
              <FilterItmeList
                items={childern}
                level={level + 1}
                key={`${id}-${childern[0].id}-${i}`}
                parentIds={[...(parentIds || []), id.toString()]}
                onCheck={onCheck}
                checks={checks}
                queryKey={queryKey}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default FilterItmeList;
