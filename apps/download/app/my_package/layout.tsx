import { AuthorizeClientPage } from "@repo/shared_modules/components";
import { routePath } from "@repo/core/constants/routePath";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthorizeClientPage baseUrl={routePath.downloadBasePath}>
      {children}
    </AuthorizeClientPage>
  );
}
