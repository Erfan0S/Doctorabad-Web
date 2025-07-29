"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import React from "react";
import Logo from ".";
import { MobileHeader } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
import { useClientComponentInitiated } from "@repo/core/hooks/useClientComponentInitiated";

const LogoProvider = () => {
  const isMobile = useMediaQuery("max-width:768px");
  const shouldRender = useClientComponentInitiated();

  return isMobile && shouldRender ? (
    <MobileHeader type={Apps.MARKET} />
  ) : (
    <Logo />
  );
};

export default LogoProvider;
