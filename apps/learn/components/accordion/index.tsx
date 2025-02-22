"use client";
import { useReducer } from "react";
import style from "./Accordion.module.scss";
import TriangleDown from "@/assets/svg/triangleDown";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { modalActions } from "@repo/core/modal/modals";

interface Props {
  title: string;
  isActive?: boolean;
  contentSpacing?: boolean;
  children?: React.ReactNode;
  className?: string;
  modalType?: ModalTypes;
  onClick?: () => void;
}

const Accordion: React.FC<Props> = ({
  title,
  isActive = true,
  children,
  className,
  modalType,
  onClick,
}) => {
  const [active, toggleActive] = useReducer((show) => !show, isActive);

  const handleClick = () => {
    toggleActive();
    onClick?.();
    if (modalType) {
      modalActions.addModal(modalType);
    }
  };

  return (
    <div className={`${style.accordion} ${className}`}>
      <div className={style.accordionTitle} onClick={handleClick}>
        <span>{title}</span>
        <TriangleDown width={18} height={18} />
      </div>

      <div className={style.accordionContent}>{children}</div>
    </div>
  );
};

export default Accordion;
