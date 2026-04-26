import MobileTileListPage from "@/components/layouts/mobile/MobileTileListPage";
import { RedirectComponent } from "@repo/shared_modules/components";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import React from "react";

export default function CollectionsList() {
  return (
    <DiviceSwitchShell
      mobile={<MobileTileListPage />}
      desktop={<RedirectComponent url="/product-list/archive" />}
    />
  );
}
