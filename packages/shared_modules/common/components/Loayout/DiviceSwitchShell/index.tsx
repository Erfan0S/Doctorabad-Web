import { VIEWPORT_HEADER } from "@repo/core/constants/constants";
import { headers } from "next/headers";
import React from "react";

type Props = {
  mobile: React.ReactNode;
  desktop: React.ReactNode;
};

export default async function DiviceSwitchShell({ mobile, desktop }: Props) {
  const headersList = await headers();
  const viewport = headersList.get(VIEWPORT_HEADER);

  return <>{viewport === "mobile" ? mobile : desktop}</>;
}
