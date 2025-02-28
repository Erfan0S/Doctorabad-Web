"use client";
import { useEffect, useReducer, useState } from "react";
import style from "./Accordion.module.scss";
import TriangleDown from "@/assets/svg/triangleDown";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { modalActions } from "@repo/core/modal/modals";
import { useSearchParams } from "next/navigation";
import { FilterModalType } from "@/types/filters";

interface Props {
  title: string;
  isActive?: boolean;
  contentSpacing?: boolean;
  children?: React.ReactNode;
  className?: string;
  modalType?: ModalTypes;
  onClick?: () => void;
}

const Accordion: React.FC<Props & FilterModalType> = ({
  title,
  isActive = true,
  children,
  className,
  modalType,
  onClick,
  items,
  queryKey,
  contentSpacing,
  singleSelection,
}) => {
  const [active, toggleActive] = useReducer((show) => !show, isActive);
  const params = useSearchParams();
  const [selected, setSelected] = useState<string | null>(null);

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

  useEffect(() => {
    const filter = params.get(queryKey);
    setSelected(items.find((item) => item.id == filter)?.title || null);
    console.log("filter ", filter);
    items.forEach((item) => {
      console.log("item ", item.id);
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
