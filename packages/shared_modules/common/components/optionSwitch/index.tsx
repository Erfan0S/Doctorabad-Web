"use client";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!isActive) {
      setIsChecked(false);
    }
  }, [isActive]);

  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onClick && onClick(e);

    if (!isActive || !canChange) return;

    setIsChecked(e.target.checked);
  };

  return (
    <>
      <li
        className={`mb-[4px] flex w-full list-none items-center text-[15px] font-medium leading-[30px] text-black ${className} ${(app as string) === "pro" ? "[--app-base:#3b9e97]" : ""} ${app}`}
      >
        
        <label htmlFor={switchId} className="m-0 cursor-pointer ps-[10px]">
          {title}
        </label>
        <div className="ms-auto flex">
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
              <label htmlFor={switchId} className="m-0 cursor-pointer ps-[10px]">
                {" "}
                <div
                  className={classNames(
                    "relative m-0 h-[26px] w-[50px] cursor-pointer rounded-[16px] border-2 border-solid border-app-base before:absolute before:top-[2px] before:h-[18px] before:w-[18px] before:rounded-[10px] before:content-[''] before:[transition:0.15s]",
                    isChecked
                      ? "bg-[color-mix(in_srgb,var(--app-base,#4fcc4c)_10%,white)] before:left-[26px] before:bg-app-base"
                      : "before:left-[2px] before:bg-gray",
                    {
                      "!cursor-default !border-gray !text-gray": !isActive,
                    },
                  )}
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
