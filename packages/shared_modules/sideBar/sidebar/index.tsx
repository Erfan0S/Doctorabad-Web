"use client";

import { useMediaQuery } from "@repo/core/hooks/useMediaQuery";
import style from "./Sidebar.module.scss";
import SidebarLogo from "./logo";
import SidebarNav from "./nav";
import { useSidebar } from "../states/sidebar";
import { useClientComponentInitiated } from "@repo/core/hooks/useClientComponentInitiated";
import { useEffect, useState } from "react";
import HeaderButtons from "../../headers/HeaderButtons";

const Sidebar = () => {
  const isMobile = useMediaQuery("max-width:768px");

  if (isMobile) return null;

  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);
  const isMainLogoActive = pathname === "/";
  const { toggleShow, show } = useSidebar();

  const shouldRender = useClientComponentInitiated();

  if (!shouldRender) {
    return null;
  }
  return (
    <aside
      className={`${style.sidebar} ${show ? style.open : ""}`}
      onMouseEnter={toggleShow}
      onMouseLeave={toggleShow}
    >
      <SidebarLogo active={isMainLogoActive} />
      <SidebarNav isMainLogoActive={isMainLogoActive} />
      <HeaderButtons variant="sidebar" />
      <span>v2.4.6</span>
    </aside>
  );
};
export default Sidebar;
