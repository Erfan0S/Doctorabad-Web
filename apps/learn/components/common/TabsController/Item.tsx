"use client";
import React, { useEffect, useState } from "react";
import style from "./ProductTabsController.module.scss";
import { CourseTab, TabData } from "@/types/courses";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type Props = {
  tabData: TabData;
  url?: string;
};

const Item = ({ tabData, url }: Props) => {
  const [isActive, setActive] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isActive) {
      setActive(true);
    } else if (
      params.get("tab") === tabData.id ||
      (!params.get("tab") && tabData.id === CourseTab.LESSONS) ||
      pathname === url
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [tabData, params]);

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
