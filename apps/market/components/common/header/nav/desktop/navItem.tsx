"use client";

import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { useState } from "react";
import { generateProductCategoryUrlFromId } from "@repo/core/utils/UrlUtils";
import { CategoryInList } from "@/types/category";
import style from "../Nav.module.scss";

interface Props {
  item: CategoryInList;
  href: string;
  level: number;
}

const DesktopNavItem = ({ item, href, level }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = Boolean(item.children?.length);

  const hasThirdLevel = item.children?.some((item) => !!item.children?.length);

  return (
    <li
      className={classNames(style.navItem, style[`level${level}`], {
        [style.hasChild]: hasChildren,
        [style.open]: isOpen,
        [style.hasThirdLevel]: hasThirdLevel,
      })}
      role="none"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={href}
        className={classNames(style.navLink, style[`navLinkLevel${level}`])}
        role="menuitem"
        aria-haspopup={hasChildren ? "menu" : undefined}
        aria-expanded={hasChildren ? isOpen : undefined}
      >
        {level === 1 && item.avatar_file?.info?.path && (
          <span className={style.navIcon}>
            <Image
              src={item.avatar_file.info.path}
              alt=""
              width={18}
              height={18}
            />
          </span>
        )}

        <span className={style.navTitle}>{item.title}</span>

        {hasChildren && (
          <svg
            className={style.navChevron}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        )}
      </Link>

      {hasChildren && (
        <ul
          className={classNames(
            style.subMenu,
            style[`subMenuLevel${level + 1}`],
            {
              [style.subMenuHasThirdLevel]: hasThirdLevel,
            },
          )}
          role="menu"
        >
          {item.children.map((child) => (
            <DesktopNavItem
              key={child.id}
              item={child}
              href={generateProductCategoryUrlFromId(child.id)}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default DesktopNavItem;
