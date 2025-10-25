import React from "react";
import {
  LoadingProps,
  Loading as SharedLoading,
} from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";

function Loading(props: LoadingProps) {
  return <SharedLoading {...props} app={Apps.EXAM} />;
}

export default Loading;
