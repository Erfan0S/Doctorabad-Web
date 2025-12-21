"use client";

import React from "react";
import { Providers as SharedProviders } from "@repo/shared_modules";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <SharedProviders haveSideBar modalList={[]}>
      {children}
    </SharedProviders>
  );
};

export default Providers;
