"use client";
import style from "./ProductTabsController.module.scss";
import Item from "./Item";
import { TabData } from "@/types/courses";

interface Props {
  tabData: TabData[];
  className?: string;
}
const TabsController: React.FC<Props> = ({ tabData, className }) => {
  return (
    <div className={`${style.productTabsController} ${className}`}>
      <ul>
        {tabData.map((data) => (
          <Item key={data.id} tabData={data} />
        ))}
      </ul>
    </div>
  );
};

export default TabsController;
