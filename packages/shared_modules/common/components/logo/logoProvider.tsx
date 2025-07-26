"use client";
import { useMediaQuery } from "@repo/core/hooks/useMediaQuery";
import MobileHeader from "../mobileHeader";
import Logo from ".";
import { Apps } from "@repo/core/types/general";

const LogoProvider = (app: Apps = Apps.BASE) => {
  const isMobile = useMediaQuery("max-width:768px");

  return isMobile ? <MobileHeader type={app} /> : <Logo />;
};

export default LogoProvider;
