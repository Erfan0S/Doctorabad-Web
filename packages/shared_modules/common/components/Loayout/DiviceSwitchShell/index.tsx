"use server";
import { VIEWPORT_HEADER } from "@repo/core/constants/constants";
import { headers } from "next/headers";
import React from "react";

type Props = {
  MobileComponent: React.ReactNode;
  DesktopComponent: React.ReactNode;
};

function DiviceSwitchShell({ MobileComponent, DesktopComponent }: Props) {
  const headersList = headers();
  const viewport = headersList.get(VIEWPORT_HEADER);
  return <>{viewport === "mobile" ? MobileComponent : DesktopComponent}</>;
}

export default DiviceSwitchShell;
