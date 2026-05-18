"use client";
import React from "react";
import style from "./ProductTabsController.module.scss";
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
      className={isActive ? style.active : ""}
      onClick={changeTab}
    >
      {tabData.title}
    </li>
  );
};

export default Item;
