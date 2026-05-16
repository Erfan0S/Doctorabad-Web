import { IS_PERVENT_GOOGLE_INDEX } from "@repo/core/constants/constants";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

function SharedHeadContents({ children }: Props) {
  return (
    <head>
      {IS_PERVENT_GOOGLE_INDEX && <meta name="robots" content="noindex" />}
      {children}
    </head>
  );
}

export default SharedHeadContents;
