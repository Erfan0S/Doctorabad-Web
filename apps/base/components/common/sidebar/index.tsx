"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import style from "./Sidebar.module.scss";
import SidebarFooter from "./footer";
import SidebarLogo from "./logo";
import SidebarNav from "./nav";
import { useSidebar } from "@/states/sidebar";
import { usePathname } from "next/navigation";
// import MobileNavBar from '../mobileNavBar';
import { useClientComponentInitiated } from "@/hooks/useClientComponentInitiated";

const Sidebar = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("max-width:768px");

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
      {isMobile ? // <MobileNavBar />
      null : (
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
