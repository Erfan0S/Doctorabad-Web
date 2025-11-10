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
  const [isExcludePath, setIsExcludePath] = useState(false);
  const [fullPathname, setFullPathname] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const href = window.location.href;
    setFullPathname(window.location.pathname);
    setIsExcludePath(!!excludePaths?.some((path) => href.includes(path)));
  }, [pathname]);

  const activeCondition = (href: string): boolean => {
    const tabPathname = new URL(href).pathname;
    return (
      (fullPathname.startsWith(tabPathname) && tabPathname != "/") ||
      (fullPathname == "/" && tabPathname == "/")
    );
  };

  if (isExcludePath) return null;

  return (
    <div
      className={`${style.sidebarNav} ${onlyOnMobile && style.sidebarNavBarMobile}`}
    >
      <ul>
        {navBarData.map(
          ({
            id,
            title,
            subTitle,
            image,
            color,
            href,
            mobileTitle,
            disabled,
          }) => {
            return (
              <li
                key={id}
                className={
                  !disabled && activeCondition(href) ? style.active : ""
                }
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
          }
        )}
      </ul>
    </div>
  );
};

export default MobileNavBar;
