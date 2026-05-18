"use client";
import style from "./ProductTabsController.module.scss";
import { MobileTabsConfig } from "@repo/core/types/configs";
import { useRouter } from "next/navigation";

type Props = {
  tabData: MobileTabsConfig;
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
