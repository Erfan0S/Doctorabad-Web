"use client";
import Image from "next/image";
import style from "./mobileNavbar.module.scss";
import { navBarData } from "./nav-bar-data";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Porps = {
  excludePaths?: string[];
  onlyOnMobile?: boolean;
};

const MobileNavBar = ({ excludePaths, onlyOnMobile = true }: Porps) => {
  // به‌جای فرض اولیه‌ی نمایش، با null شروع می‌کنیم یعنی «هنوز نمی‌دونیم»
  const [isExcludePath, setIsExcludePath] = useState<boolean | null>(null);
  const [fullPathname, setFullPathname] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const href = window.location.href;
    setFullPathname(window.location.pathname);
    setIsExcludePath(!!excludePaths?.some((path) => href.includes(path)));
  }, [pathname]);

  const activeCondition = (basePath: string): boolean => {
    return (
      (fullPathname.startsWith(basePath) && basePath != "/") ||
      (fullPathname == "/" && basePath == "/")
    );
  };

  // تا وقتی بررسی کامل نشده (null) یا مسیر جزو exclude بود، هیچی نشون نده
  if (isExcludePath === null || isExcludePath) return null;

  return (
    <div
      className={`${style.sidebarNav} ${onlyOnMobile && style.sidebarNavBarMobile}`}
    >
      <ul>
        {navBarData.map(
          ({ id, title, subTitle, image, color, href, mobileTitle, basePath }) => {
            return (
              <li
                key={id}
                className={activeCondition(basePath) ? style.active : ""}
                id={String(id)}
              >
                <a href={href} className={style[color]}>
                  <div>
                    <Image src={image} alt={title} width={40} height={40} />
                  </div>
                  <span>{mobileTitle}</span>
                </a>
              </li>
            );
          },
        )}
      </ul>
    </div>
  );
};

export default MobileNavBar;