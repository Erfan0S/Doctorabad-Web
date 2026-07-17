"use client";

import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { useState } from "react";
import { generateProductCategoryUrlFromId } from "@repo/core/utils/UrlUtils";
import { CategoryInList } from "@/types/category";

interface Props {
  item: CategoryInList;
  href: string;
  level: number;
}

// Class names live in packages/tailwind-config/components.css (.market-nav-*).
const DesktopNavItem = ({ item, href, level }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = Boolean(item.children?.length);

  const hasThirdLevel = item.children?.some((item) => !!item.children?.length);

  return (
    <li
      className={classNames("market-nav-item", `market-nav-level${level}`, {
        "market-nav-has-child": hasChildren,
        open: isOpen,
        "market-nav-has-3rd": hasThirdLevel,
      })}
      role="none"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={href}
        className={classNames("market-nav-link", `market-nav-link-level${level}`)}
        role="menuitem"
        aria-haspopup={hasChildren ? "menu" : undefined}
        aria-expanded={hasChildren ? isOpen : undefined}
      >
        {level === 1 && item.avatar_file?.info?.path && (
          <span className="market-nav-icon">
            <Image
              src={item.avatar_file.info.path}
              alt=""
              width={18}
              height={18}
            />
          </span>
        )}

        <span className="market-nav-title">{item.title}</span>

        {hasChildren && (
          <svg
            className="market-nav-chevron"
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
            "market-nav-submenu",
            `market-nav-submenu-level${level + 1}`,
            {
              "market-nav-submenu-has-3rd": hasThirdLevel,
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
