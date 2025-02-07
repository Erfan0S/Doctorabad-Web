"use client";
import React, { useEffect, useState } from "react";
import style from "./ProductTabsController.module.scss";
import { CourseTab, TabData } from "@/types/courses";
import { useSearchParams, useRouter } from "next/navigation";

type Props = {
  tabData: TabData;
};

const Item = ({ tabData }: Props) => {
  const [isActive, setActive] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (
      params.get("tab") === tabData.id ||
      (!params.get("tab") && tabData.id === CourseTab.LESSONS)
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [tabData, params]);

  const changeTab = () => {
    router.push(`?tab=${tabData.id}`);
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
