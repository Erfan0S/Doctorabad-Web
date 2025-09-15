"use client";
import { useEffect, useState } from "react";
import style from "./Accordion.module.scss";
import TriangleDown from "../../../assets/svg/triangleDown";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { modalActions } from "@repo/core/modal/modals";
import { useSearchParams } from "next/navigation";
import { FilterModalType } from "@repo/core/types/filter";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import Loading from "../loading";

interface Props {
  title: string;
  isActive?: boolean;
  contentSpacing?: boolean;
  children?: React.ReactNode;
  className?: string;
  modalType?: ModalTypes;
  dependencies?: (string | null)[];
  onClick?: () => void;
  isLoading?: boolean;
  initialTitle?: string;
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
  app,
  isLoading,
  initialTitle,
}) => {
  const params = useSearchParams();
  const [selected, setSelected] = useState<string | null>(initialTitle || null);
  const changeFilters = useChangeSearchParamsFilter();

  const handleClick = () => {
    if (!isActive || isLoading || !items.length) return;
    modalActions.addModal(ModalTypes.SELECT_FILTER, {
      title,
      items,
      queryKey,
      singleSelection,
      app,
    });
  };

  useEffect(() => {
    setSelected(initialTitle || null);
  }, [initialTitle]);

  useEffect(() => {
    if (!queryKey) return;
    const filter = params?.get(queryKey);
    setSelected(items.find((item) => item.id == filter)?.title || null);

    let deps: { [key: string]: any } = {};
    dependencies &&
      dependencies.map((dep) => {
        if (!dep) return;
        deps = { ...deps, [dep]: null };
      });
    changeFilters(deps);
  }, [queryKey && params?.get(queryKey)]);

  return (
    <div
      className={`${style.accordion} ${!isActive || !items.length ? style.deActive : ""} ${className} ${style[app]}`}
    >
      <div className={style.accordionTitle} onClick={handleClick}>
        <span>{isLoading ? <Loading app={app} /> : selected || title}</span>
        {isActive && queryKey && <TriangleDown width={18} height={18} />}
      </div>

      <div className={style.accordionContent}>{children}</div>
    </div>
  );
};

export default Accordion;
