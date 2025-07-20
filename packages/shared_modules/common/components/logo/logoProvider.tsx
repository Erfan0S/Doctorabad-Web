"use client";
import { useMediaQuery } from "@repo/core/hooks/useMediaQuery";
import MobileHeader from "../mobileHeader";
import Logo from ".";

const LogoProvider = () => {
  const isMobile = useMediaQuery("max-width:768px");

  return isMobile ? <MobileHeader /> : <Logo />;
};

export default LogoProvider;
