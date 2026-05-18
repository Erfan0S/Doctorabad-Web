import Loading from "@/components/common/loading";
import CollectionsList from "@/components/TileLists/CollectionsList";
import ProvidersList from "@/components/TileLists/ProvidersList";
import { MainTabsData } from "@/constants/tabsData";
import { Apps } from "@repo/core/types/general";
import { MobileHomeHeader } from "@repo/shared_modules/headers";
import React, { Suspense } from "react";

type Props = {
  isProvider?: boolean;
};

async function MobileTileListPage({ isProvider = false }: Props) {
  return (
    <div>
      <MobileHomeHeader type={Apps.MARKET} tabData={MainTabsData} />
      <Suspense fallback={<Loading />}>
        {isProvider ? <ProvidersList /> : <CollectionsList />}
      </Suspense>
    </div>
  );
}

export default MobileTileListPage;
