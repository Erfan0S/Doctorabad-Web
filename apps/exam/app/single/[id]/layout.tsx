"use client";
import { routePath } from "@repo/core/constants/routePath";
import { AuthorizeClientPage } from "@repo/shared_modules/components";
import React from "react";

function singleLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthorizeClientPage baseUrl={routePath.examBasePath}>
      {children}
    </AuthorizeClientPage>
  );
}

export default singleLayout;
