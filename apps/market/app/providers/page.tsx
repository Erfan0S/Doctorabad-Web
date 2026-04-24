import MobileTileListPage from "@/components/layouts/mobile/MobileTileListPage";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import { redirect } from "next/navigation";
import React from "react";

const ProvidersList = () => {
  return (
    <div>
      <DiviceSwitchShell
        DesktopComponent={() => redirect("/product-list/archive")}
        MobileComponent={<MobileTileListPage isProvider />}
      />
    </div>
  );
};

export default ProvidersList;
