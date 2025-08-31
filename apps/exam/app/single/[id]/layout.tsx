import { AuthorizeClientPage } from "@repo/shared_modules/components";
import React from "react";

function singleLayout({ children }: { children: React.ReactNode }) {
  return <AuthorizeClientPage>{children}</AuthorizeClientPage>;
}

export default singleLayout;
