"use client";
import Image from "next/image";
import style from "./mobileNavbar.module.scss";
import { navBarData } from "./nav-bar-data";
import { isServerSide } from "@repo/core/constants/constants";
import { usePathname } from "next/navigation";

type Porps = {
  excludePaths?: string[];
};

const MobileNavBar = ({ excludePaths }: Porps) => {
  const href = window.location.href;
  console.log(href, "pathname");
  const isExcludePath = excludePaths?.some((path) => href.includes(path));

  const activeCondition = (href: string): boolean => {
    const fullPathname = !isServerSide ? window.location.href : "";
    return (
      (fullPathname.startsWith(href) && href != "/") ||
      (fullPathname == "/" && href == "/")
    );
  };

  if (isExcludePath) return null;

  return (
    <div className={style.sidebarNav}>
      <ul>
        {navBarData.map(
          ({ id, title, subTitle, image, color, href, mobileTitle }) => {
            return (
              <li
                key={id}
                className={activeCondition(href) ? style.active : ""}
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
