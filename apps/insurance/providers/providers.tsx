"use client";

import React from "react";
import { Providers as SharedProviders } from "@repo/shared_modules";
import { ModalsList } from "../components/common/modal/modalsList";


const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <SharedProviders modalList={ModalsList}>
      {children}
    </SharedProviders>
  );
};

export default Providers;
