"use client";
import { useEffect, useState } from "react";
import TriangleDown from "../../../assets/svg/triangleDown";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { modalActions } from "@repo/core/modal/modals";
import { useSearchParams } from "next/navigation";
import {
  AccordionProps,
  FilterModalType,
  SelectFilterItems,
} from "@repo/core/types/filter";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import Loading from "../loading";

const Accordion: React.FC<AccordionProps> = ({
  title,
  isActive = true,
  children,
  className,
  items,
  queryKey,
  dependencies,
  singleSelection,
  app,
  isLoading,
  customContent,
  defaultValue,
}) => {
  const params = useSearchParams();
  const [selected, setSelected] = useState<SelectFilterItems[] | null>(null);
  const changeFilters = useChangeSearchParamsFilter();

  const haveContent = !!items?.length || !!customContent;

  const handleClick = () => {
    if (!isActive || isLoading || !haveContent) return;
    modalActions.addModal(ModalTypes.SELECT_FILTER, {
      title,
      items,
      queryKey,
      singleSelection,
      app,
      customContent,
    });
  };

  const getSelectedItems = (items: SelectFilterItems[], filter?: string[]) => {
    if (!items?.length || !filter?.length) return;
    let selectedItems: SelectFilterItems[] = [];
    items.forEach((item) => {
      if (filter?.includes(item.id.toString())) {
        selectedItems.push(item);
      } else if (!!item.childern?.length) {
        selectedItems.push(...(getSelectedItems(item.childern, filter) || []));
      }
    });

    return selectedItems;
  };

  useEffect(() => {
    if (defaultValue && !params?.get(queryKey || "")) {
      changeFilters({ [queryKey || ""]: defaultValue });
      setSelected(getSelectedItems(items || [], [defaultValue]) || null);
    }
  }, []);

  useEffect(() => {
    if (!queryKey) return;
    const filter = params?.get(queryKey)?.split(",");
    if (!!filter?.length) {
      setSelected(getSelectedItems(items, filter) || null);
    } else {
      setSelected(null);
    }
  }, [queryKey && params?.get(queryKey), items]);

  useEffect(() => {
    if (!dependencies) return;
    let deps: { [key: string]: any } = {};
    dependencies &&
      dependencies.map((dep) => {
        if (!dep) return;
        deps = { ...deps, [dep]: null };
      });
    changeFilters(deps);
  }, [queryKey && params?.get(queryKey)]);

  const getSelectedTitles = (items?: SelectFilterItems[] | null) => {
    if (!items?.length) return null;
    let title = items?.map((item) => item.title)?.join(", ");
    items.forEach((item) => {
      if (!!item.childern?.length)
        title = title + ", " + getSelectedTitles(item.childern);
    });
    return title;
  };

  return (
    <div
      className={`flex cursor-pointer items-center rounded-[12px] border-2 border-solid border-app-base px-[8px] py-[6px] ${!isActive || !haveContent ? "!cursor-default !border-gray [&_span]:!text-gray [&_svg]:!fill-gray" : ""} ${className} ${app}`}
    >
      <div
        className="flex w-full items-center [&_svg]:ms-auto [&_svg]:fill-app-base"
        onClick={handleClick}
      >
        <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center font-semibold text-black">
          {isLoading ? (
            <Loading app={app} />
          ) : (
            getSelectedTitles(selected) || title
          )}
        </span>
        {isActive && (queryKey || !!customContent) && (
          <TriangleDown width={18} height={18} />
        )}
      </div>

      <div className="hidden">{children}</div>
    </div>
  );
};

export default Accordion;
