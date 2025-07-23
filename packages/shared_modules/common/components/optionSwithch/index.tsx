"use client";
import React, { useEffect, useState } from "react";
import style from "./OptionSwitch.module.scss";
import classNames from "classnames";
import { Apps } from "@repo/core/types/general";

type Props = {
  activeSwitchComponent?: JSX.Element | null;
  title: string;
  id?: string;
  onToggle?: (state: boolean) => void;
  className?: string;
  app?: Apps;
};

const OptionSwitch = ({
  activeSwitchComponent,
  title,
  id,
  onToggle,
  className,
  app = Apps.BASE,
}: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const switchId = "sw_" + (id ? id : 1);

  useEffect(() => {
    onToggle && onToggle(isChecked);
  }, [isChecked]);

  return (
    <>
      <li className={`${style.options} ${className} ${style[app]}`}>
        <span>{title}</span>
        <div className={style.optionsWrapper}>
          <div
            className={classNames(style.optionsSwitch, {
              [style.optionsSwitchActive]: isChecked,
            })}
            id={switchId}
            onClick={(e) => {
              setIsChecked((prev) => !prev);
            }}
          />
        </div>
      </li>
      {isChecked && activeSwitchComponent && <li>{activeSwitchComponent}</li>}
    </>
  );
};

export default OptionSwitch;
