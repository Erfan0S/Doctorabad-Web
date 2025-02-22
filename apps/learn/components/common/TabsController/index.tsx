"use client";
import style from "./ProductTabsController.module.scss";
import Item from "./Item";
import { TabData } from "@/types/courses";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface Props {
  tabData: TabData[];
  className?: string;
}
const TabsController: React.FC<Props> = ({ tabData, className }) => {
  return (
    <div className={`${style.productTabsController} ${className}`}>
      <ul>
        {tabData.map((data) => (
          <Item key={data.id} tabData={data} url={data?.url} />
        ))}
      </ul>
    </div>
  );
};

export default TabsController;
