"use client";
import React, {useEffect, useState} from "react";
import style from "./OptionSwitch.module.scss";
import classNames from "classnames";
import {Apps} from "@repo/core/types/general";
import {useChangeSearchParamsFilter} from "@repo/core/hooks/useChangeSearchParamsFilter";
import {useSearchParams} from "next/navigation";

type Props = {
  activeSwitchComponent?: JSX.Element | null;
  title: string;
  name: string;
  onToggle?: (state: boolean) => void;
  onClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  app?: Apps;
  addToQuery?: boolean;
  isActive?: boolean;
};

const OptionSwitch = ({
  activeSwitchComponent,
  title,
  name,
  onToggle,
  className,
  app = Apps.BASE,
  addToQuery,
  isActive = true,
  onClick,
}: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const setSeachParam = useChangeSearchParamsFilter();
  const searchParam = useSearchParams();

  const switchId = "sw_" + name;

  useEffect(() => {
    if (addToQuery) {
      setIsChecked(searchParam?.get(name) == "1");
    }
  }, []);

  useEffect(() => {
    onToggle && onToggle(isChecked);
  }, [isChecked]);

  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onClick && onClick(e);
    if (!isActive) return;
    setIsChecked(e.target.checked);
    if (addToQuery) {
      setSeachParam({
        [name]: e.target.checked ? "1" : null,
      });
    }
  };

  return (
    <>
      <li className={`${style.options} ${className} ${style[app]}`}>
        <label htmlFor={switchId}>{title}</label>
        <div className={style.optionsWrapper}>
          <input
            type="checkbox"
            hidden
            id={switchId}
            checked={isChecked}
            onChange={handleSwitch}
            name={name}
          />
          <label htmlFor={switchId}>
            {" "}
            <div
              className={classNames(style.optionsSwitch, {
                [style.optionsSwitchActive]: isChecked,
              })}
            />
          </label>
        </div>
      </li>
      {isChecked && activeSwitchComponent && <li>{activeSwitchComponent}</li>}
    </>
  );
};

export default OptionSwitch;
