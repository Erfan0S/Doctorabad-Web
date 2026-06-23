"use client";

import React from "react";
import { ModalsList } from "@repo/shared_modules/modalsList";
import { Providers as SharedProviders } from "@repo/shared_modules";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <SharedProviders haveSideBar modalList={ModalsList}>
      {/* {isHome && isLoggedIn ? null : <SidebarProvider />} */}
      {children}
    </SharedProviders>
  );
};

export default Providers;
