import Image from "next/image";
import style from "./mobileNavbar.module.scss";
import { navBarData } from "./nav-bar-data";
import React from "react";

const MobileNavBar = () => {
  const activeCondition = (href: string): boolean => {
    const pathname = window.location.pathname;
    return (
      (pathname.startsWith(href) && href != "/") ||
      (pathname == "/" && href == "/")
    );
  };

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
