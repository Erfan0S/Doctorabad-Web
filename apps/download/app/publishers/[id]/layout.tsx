import { generateProviderMetaData } from "@/metadata/provider";
import React from "react";

export const generateMetadata = generateProviderMetaData;

function ProviderLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default ProviderLayout;
