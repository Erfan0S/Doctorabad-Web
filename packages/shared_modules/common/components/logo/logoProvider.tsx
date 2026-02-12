"use client";
import { useMediaQuery } from "@repo/core/hooks/useMediaQuery";
import Logo from ".";
import { Apps } from "@repo/core/types/general";
import { MobileHeaderBase } from "@repo/shared_modules/headers";

const LogoProvider = (app: Apps = Apps.BASE) => {
  const isMobile = useMediaQuery("max-width:768px");

  return isMobile ? <MobileHeaderBase type={app} /> : <Logo />;
};

export default LogoProvider;
