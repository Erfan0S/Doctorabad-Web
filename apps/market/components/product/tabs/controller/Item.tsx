import React, { useEffect, useState } from "react";
import { ProductTabData } from "@repo/core/types";

import style from "./ProductTabsController.module.scss";

type Props = {
  tabData: ProductTabData;
};

const Item = ({ tabData }: Props) => {
  const [isActive, setActive] = useState(false);
  const sectionHeaderOffset = 138;
  const tabOffset = 80;

  const handleScroll = () => {
    const pageYOffset = window.pageYOffset;
    const windowInnerHeight = window.innerHeight;
    const element = document.getElementById(tabData.id);

    if (element) {
      const sectionOffsetTop = element.offsetTop + sectionHeaderOffset;
      const sectionHeight = element.offsetHeight;

      const hasActiveCondition =
        pageYOffset + windowInnerHeight / 2 >= sectionOffsetTop &&
        pageYOffset + windowInnerHeight / 2 <= sectionOffsetTop + sectionHeight;

      setActive(hasActiveCondition);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabData]);

  const goToSection = () => {
    const element = document.getElementById(tabData.id);
    const topPos = element!.offsetTop + sectionHeaderOffset - tabOffset;
    window.scrollTo({
      top: topPos,
      behavior: "smooth",
    });
  };

  return (
    <li
      key={tabData.id}
      className={isActive ? style.active : ""}
      onClick={goToSection}
    >
      {tabData.title}
    </li>
  );
};

export default Item;
