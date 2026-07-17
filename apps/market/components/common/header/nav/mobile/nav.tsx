"use client";
import { useEffect, useReducer, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { CategoryInList, CategoryList } from "@/types/category";
import Menu from "@/assets/svg/menu";
import Close from "@/assets/svg/close";
import MenuItem from "./navItem";
import { generateProductCategoryUrlFromId } from "@repo/core/utils/UrlUtils";
import BackArrow from "@/assets/svg/backArrow";
import {
  fadeInAnimation,
  mobileNavListReplace,
  slideRightAnimation,
} from "@repo/core/constants/animationConfigs";
import { useRouter } from "next/navigation";
import { lockPageScroll } from "@repo/core/utils/lockPageScroll";

interface Props {
  navData: CategoryList;
}

// .market-mobile-nav / .market-modal-overlay live in packages/tailwind-config/components.css
const MobileNav = ({ navData }: Props) => {
  const router = useRouter();

  const [showMobileMenu, toggleMobileMenu] = useReducer((prev) => !prev, false);

  const [currentList, setCurrentList] = useState(navData);
  const [parentList, setParentList] = useState<{
    [key: number]: CategoryInList;
  }>({});

  const openChildrenList = (id: number) => {
    const list = currentList.find((item) => item.id === id)!;
    if (!parentList[list.id])
      setParentList((prev) => ({ ...prev, [list.id]: list }));
    setCurrentList(list.children);
  };

  const parentId = currentList[0]!.parent;

  const openParentList = () => {
    const secondParent = parentList[parentList[parentId!]!.parent!];

    setCurrentList(secondParent ? secondParent.children : navData);
  };

  const redirect = (id: number) => {
    toggleMobileMenu();
    router.push(generateProductCategoryUrlFromId(id));
  };

  useEffect(() => {
    lockPageScroll(showMobileMenu);
  }, [showMobileMenu]);

  const listTitle = parentId ? parentList[parentId]!.title : "دسته‌بندی‌ها";

  return (
    <>
      {showMobileMenu && (
        <motion.div
          {...fadeInAnimation}
          onClick={toggleMobileMenu}
          className="market-modal-overlay"
        ></motion.div>
      )}
      <Menu className="market-nav-toggle" onClick={toggleMobileMenu} />
      <AnimatePresence>
        {showMobileMenu && (
          <motion.nav {...slideRightAnimation} className="market-mobile-nav">
            <div className="market-mobile-nav-header">
              {parentId ? (
                <BackArrow
                  onClick={openParentList}
                  style={{ transform: "rotate(180deg) translateY(10px)" }}
                  stroke="#000"
                />
              ) : (
                <Close onClick={toggleMobileMenu} />
              )}

              <h6>{listTitle}</h6>
            </div>
            <AnimatePresence>
              <motion.ul key={parentId} {...mobileNavListReplace}>
                {currentList.map(({ id, title, children }) => (
                  <MenuItem
                    redirect={() => redirect(id)}
                    title={title}
                    key={id}
                    openChildrenList={
                      children.length ? () => openChildrenList(id) : undefined
                    }
                  />
                ))}
              </motion.ul>
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
