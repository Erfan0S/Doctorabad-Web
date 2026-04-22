import React from "react";
import { Loading as SharedLoading } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";

export default function Loading() {
  return <SharedLoading app={Apps.DOWNLOAD} />;
}
