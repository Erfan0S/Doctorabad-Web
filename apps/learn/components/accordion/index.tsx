"use client";
import { useEffect, useReducer, useState } from "react";
import style from "./Accordion.module.scss";
import TriangleDown from "@/assets/svg/triangleDown";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { modalActions } from "@repo/core/modal/modals";
import { useSearchParams } from "next/navigation";
import { FilterModalType } from "@/types/filters";
import { useChangeSearchParamsFilter } from "@/utils/useChangeSearchParamsFilter";

interface Props {
  title: string;
  isActive?: boolean;
  contentSpacing?: boolean;
  children?: React.ReactNode;
  className?: string;
  modalType?: ModalTypes;
  dependencies?: (string | null)[];
  onClick?: () => void;
}

const Accordion: React.FC<Props & FilterModalType> = ({
  title,
  isActive = true,
  children,
  className,
  items,
  queryKey,
  dependencies,
  singleSelection,
}) => {
  const [active, toggleActive] = useReducer((show) => !show, isActive);
  const params = useSearchParams();
  const [selected, setSelected] = useState<string | null>(null);
  const changeFilters = useChangeSearchParamsFilter();

  const handleClick = () => {
    if (!isActive) return;
    toggleActive();
    modalActions.addModal(ModalTypes.SELECT_FILTER, {
      title: title,
      items: items,
      queryKey: queryKey,
      singleSelection: singleSelection,
    });
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const filter = params.get(queryKey);
    setSelected(items.find((item) => item.id == filter)?.title || null);

    dependencies &&
      dependencies.forEach((dep) => {
        if (!dep) return;
        changeFilters({ [dep]: null });
      });
  }, [params.get(queryKey)]);

  return (
    <div
      className={`${style.accordion} ${!isActive ? style.deActive : ""} ${className}`}
    >
      <div className={style.accordionTitle} onClick={handleClick}>
        <span>{selected || title}</span>
        <TriangleDown width={18} height={18} />
      </div>

      <div className={style.accordionContent}>{children}</div>
    </div>
  );
};

export default Accordion;
