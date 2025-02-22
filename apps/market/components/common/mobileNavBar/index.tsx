import Image from "next/image";
import style from "./mobileNavbar.module.scss";
import { navBarData } from "./nav-bar-data";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface Props {
  isMainLogoActive: boolean;
}
const squircleColor: { [key: string]: string } = {
  red: "#F0CCCB",
  orange: "#FEEBD6",
  green: "#DAF4CB",
  blue: "#C7E5F2",
  purple: "#DCD3F0",
};

const MobileNavBar = () => {
  const pathname = usePathname();

  const activeCondition = (href: string): boolean => {
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
                <Link href={href} className={style[color]}>
                  <div>
                    <Image src={image} alt={title} width={40} height={40} />
                  </div>

                  <span>{mobileTitle}</span>
                </Link>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default MobileNavBar;
