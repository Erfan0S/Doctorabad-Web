"use client";

import { useMediaQuery } from "@repo/core/hooks/useMediaQuery";
import style from "./Sidebar.module.scss";
import SidebarFooter from "./footer";
import SidebarLogo from "./logo";
import SidebarNav from "./nav";
import { useSidebar } from "../states/sidebar";
import { usePathname } from "next/navigation";
// import MobileNavBar from '../mobileNavBar';
import { useClientComponentInitiated } from "@repo/core/hooks/useClientComponentInitiated";

const Sidebar = () => {
  const isMobile = useMediaQuery("max-width:768px");
  const pathname = window.location.pathname;

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
      {isMobile ? null : ( // <MobileNavBar />
        <>
          <SidebarLogo active={isMainLogoActive} />
          <SidebarNav isMainLogoActive={isMainLogoActive} />
          <SidebarFooter />
        </>
      )}

      <span>v2.4.6</span>
    </aside>
  );
};
export default Sidebar;
