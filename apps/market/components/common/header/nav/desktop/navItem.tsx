"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { generateProductCategoryUrlFromId } from "@repo/core/utils/UrlUtils";
import { CategoryInList } from "@/types/category";
import style from "../Nav.module.scss";

interface MappedCategory {
  id: number;
  title: string;
  href: string;
  image: string | null;
  children: CategoryInList[];
}

interface Props {
  category: MappedCategory;
}

/**
 * DesktopNavItem
 * Renders a single top-level category row in the sidebar.
 * On hover it shows a flyout mega-panel with sub-category columns.
 */
const DesktopNavItem: React.FC<Props> = ({ category }) => {
  const { title, href, image, children } = category;
  const [open, setOpen] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setOpen(true);
  }, []);

  const handleLeave = useCallback(() => {
    // Small delay so user can move mouse into the flyout panel
    leaveTimer.current = setTimeout(() => setOpen(false), 80);
  }, []);

  const hasChildren = children.length > 0;

  return (
    <li
      className={`${style.navItem} ${hasChildren ? style.navItemHasChild : ""} ${
        open ? style.navItemOpen : ""
      }`}
      role="menuitem"
      aria-haspopup={hasChildren}
      aria-expanded={open}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Sidebar row */}
      <Link href={href} className={style.navItemLink}>
        {image && (
          <span className={style.navItemIcon}>
            <Image src={image} alt="" width={20} height={20} />
          </span>
        )}
        <span className={style.navItemTitle}>{title}</span>
        {hasChildren && (
          <svg
            className={style.navItemArrow}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        )}
      </Link>

      {/* Flyout mega-panel */}
      {hasChildren && (
        <div
          className={style.megaPanel}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          role="menu"
          aria-label={`زیر دسته‌های ${title}`}
        >
          <div className={style.megaPanelInner}>
            {/* Optional category hero image */}
            {image && (
              <div className={style.megaPanelImage}>
                <Image src={image} alt={title} fill style={{ objectFit: "contain" }} />
              </div>
            )}

            {/* Sub-category columns */}
            <div className={style.megaColumns}>
              {children.map((col) => (
                <div key={col.id} className={style.megaCol} role="group">
                  {/* Column header link */}
                  <Link
                    href={generateProductCategoryUrlFromId(col.id)}
                    className={style.megaColTitle}
                    role="menuitem"
                  >
                    {col.title}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                      className={style.megaColTitleArrow}
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </Link>

                  {/* Column children */}
                  {col.children?.length > 0 && (
                    <ul className={style.megaColList}>
                      {col.children.map((item) => (
                        <li key={item.id} role="none">
                          <Link
                            href={generateProductCategoryUrlFromId(item.id)}
                            className={style.megaColItem}
                            role="menuitem"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default DesktopNavItem;
