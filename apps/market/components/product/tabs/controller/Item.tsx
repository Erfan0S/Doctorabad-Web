import React, { useEffect, useState } from "react";
import { ProductTabData } from "@repo/core/types/product";

// tab item with the 6px indicator bar under the active tab
const LI_BASE =
  "relative me-4 cursor-pointer px-3 text-[15px] font-semibold leading-10 last-of-type:me-0 before:absolute before:inset-x-0 before:bottom-[-3px] before:h-[6px] before:rounded-[3px] before:content-['']";

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
      className={`${LI_BASE} ${
        isActive ? "before:bg-orange" : "before:bg-transparent"
      }`}
      onClick={goToSection}
    >
      {tabData.title}
    </li>
  );
};

export default Item;
