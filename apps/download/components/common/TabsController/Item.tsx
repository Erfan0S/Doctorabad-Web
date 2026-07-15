"use client";
import React from "react";
import { TabData } from "@/types/packages";
import { useRouter } from "next/navigation";

type Props = {
  tabData: TabData;
  isActive?: boolean;
  url?: string;
};

const Item = ({ tabData, url, isActive }: Props) => {
  const router = useRouter();

  const changeTab = () => {
    router.push(url ? url : `?tab=${tabData.id}`);
  };

  return (
    <li
      key={tabData.id}
      className={`relative ml-4 flex-1 cursor-pointer select-none px-3 pb-[7px] pt-0 text-center text-[15px] leading-[30px] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[6px] before:rounded-[3px] before:content-[''] last-of-type:ml-0 [&_a]:text-black ${
        isActive
          ? "font-bold before:bg-blue"
          : "font-medium before:bg-transparent"
      }`}
      onClick={changeTab}
    >
      {tabData.title}
    </li>
  );
};

export default Item;
