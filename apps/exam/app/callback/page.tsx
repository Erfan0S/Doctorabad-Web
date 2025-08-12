"use client";
import { Apps } from "@repo/core/types/general";
import CallbakContainer from "@repo/shared_modules/checkout/callback";

export default function CallbackPage() {
  return <CallbakContainer app={Apps.EXAM} />;
}
