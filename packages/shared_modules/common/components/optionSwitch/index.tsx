"use client";
import React, { useEffect, useState } from "react";
import style from "./OptionSwitch.module.scss";
import classNames from "classnames";
import { Apps } from "@repo/core/types/general";
import { useChangeSearchParamsFilter } from "@repo/core/hooks/useChangeSearchParamsFilter";
import { useSearchParams } from "next/navigation";
import { Loading } from "..";

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
  isLoading?: boolean;
  isDefaulChecked?: boolean;
  canChange?: boolean;
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
  isLoading = false,
  isDefaulChecked,
  canChange = true,
}: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const setSeachParam = useChangeSearchParamsFilter();
  const searchParam = useSearchParams();
  const searchParamValue = searchParam?.get(name);

  const switchId = "sw_" + name;

  useEffect(() => {
    if (addToQuery && isDefaulChecked === undefined) {
      setIsChecked(searchParamValue == "1");
    }
  }, []);

  useEffect(() => {
    if (isDefaulChecked !== undefined) {
      setIsChecked(isDefaulChecked);
    }
  }, [isDefaulChecked]);

  useEffect(() => {
    onToggle && onToggle(isChecked);
  }, [isChecked]);

  useEffect(() => {
    if (addToQuery) {
      setSeachParam({
        [name]: isChecked ? "1" : null,
      });
    }
  }, [isChecked]);

  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onClick && onClick(e);
    if (!isActive || !canChange) return;
    setIsChecked(e.target.checked);
  };

  return (
    <>
      <li className={`${style.options} ${className} ${style[app]}`}>
        <label htmlFor={switchId}>{title}</label>
        <div className={style.optionsWrapper}>
          {isLoading ? (
            <Loading app={app} />
          ) : (
            <>
              <input
                type="checkbox"
                hidden
                id={switchId}
                checked={isChecked}
                onChange={handleSwitch}
                defaultValue={isDefaulChecked ? "1" : undefined}
                name={name}
              />
              <label htmlFor={switchId}>
                {" "}
                <div
                  className={classNames(style.optionsSwitch, {
                    [style.optionsSwitchActive]: isChecked,
                    [style.disabled]: !isActive,
                  })}
                />
              </label>
            </>
          )}
        </div>
      </li>
      {isChecked && activeSwitchComponent && <li>{activeSwitchComponent}</li>}
    </>
  );
};

export default OptionSwitch;
