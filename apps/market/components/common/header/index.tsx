"use client";

import { usePathname } from "next/navigation";
import style from "./Header.module.scss";

import MobileHeader from "./mobileHeader";
import { routePath } from "@repo/core/constants/routePath";

const modulesWithCustomHeader = [routePath.marketBasePath];

const Header = () => {
  const pathname = usePathname();

  if (modulesWithCustomHeader.find((path) => pathname.startsWith(path)))
    return null;

  return (
    <>
      <header className={style.header}>
        <div className="container">
          <MobileHeader />
        </div>
      </header>
    </>
  );
};
export default Header;
