import { SelectFilterItems } from "@repo/core/types/filter";
import ArrowBottom from "../../../assets/svg/arrowBottom";
import ArrowRight from "../../../assets/svg/arrowRight";
import { Dispatch, SetStateAction } from "react";
import { onCheckType } from ".";

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
    <ul>
      {items.map(({ id, title, childern }, i) => {
        const uniqueId = `checkbox_${queryKey}_${id}_id_${i}`;
        return (
          <li key={uniqueId}>
            <div>
              <input
                id={uniqueId}
                type="checkbox"
                checked={checks[id]}
                onChange={(e) =>
                  onCheck(
                    id.toString(),
                    level,
                    !checks[id],
                    childern,
                    parentIds
                  )
                }
              />
              <label htmlFor={uniqueId}>
                <span>{title}</span>
              </label>
              {!!childern?.length && (
                <span
                  onClick={() =>
                    setIsOpen((prev) => ({
                      ...prev,
                      [uniqueId]: !prev[uniqueId],
                    }))
                  }
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
