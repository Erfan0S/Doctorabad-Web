import MobileTileListPage from "@/components/layouts/mobile/MobileTileListPage";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import React from "react";

function CollectionsList() {
  return (
    <div>
      <DiviceSwitchShell
        DesktopComponent={""}
        MobileComponent={<MobileTileListPage />}
      />
    </div>
  );
}

export default CollectionsList;
