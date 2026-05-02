import MobileTileListPage from "@/components/layouts/mobile/MobileTileListPage";
import { marketPaths } from "@repo/core/constants/routePath";
import { RedirectComponent } from "@repo/shared_modules/components";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import React from "react";

const ProvidersList = () => {
  return (
    <div>
      <DiviceSwitchShell
        desktop={<RedirectComponent url={marketPaths.archive} />}
        mobile={<MobileTileListPage isProvider />}
      />
    </div>
  );
};

export default ProvidersList;
