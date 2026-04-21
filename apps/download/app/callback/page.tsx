"use client";
import { Apps } from "@repo/core/types/general";
import CallbakContainer from "@repo/shared_modules/checkout/callback";

export default function CallbacPage() {
  return <CallbakContainer app={Apps.MARKET} />;
}
