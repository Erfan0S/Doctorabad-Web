import MobileTileListPage from "@/components/layouts/mobile/MobileTileListPage";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import React from "react";

const ProvidersList = () => {
  return (
    <div>
      <DiviceSwitchShell
        DesktopComponent={""}
        MobileComponent={<MobileTileListPage isProvider />}
      />
    </div>
  );
};

export default ProvidersList;
