import MobileTileListPage from "@/components/layouts/mobile/MobileTileListPage";
import { RedirectComponent } from "@repo/shared_modules/components";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import { redirect } from "next/navigation";
import React from "react";

const ProvidersList = () => {
  return (
    <div>
      <DiviceSwitchShell
        desktop={<RedirectComponent url="/product-list/archive" />}
        mobile={<MobileTileListPage isProvider />}
      />
    </div>
  );
};

export default ProvidersList;
