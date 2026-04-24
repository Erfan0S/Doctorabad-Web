import { api } from "@/api/Api";
import { ProvidersList as ProvidersListType } from "@/types/providers";
import { marketPaths } from "@repo/core/constants/routePath";
import { TileList } from "@repo/shared_modules/components";
import React from "react";

async function ProvidersList() {
  const ProvidersList: ProvidersListType = (await api.getProviders()).data.data;

  return (
    <TileList
      categories={ProvidersList.map((p) => ({
        id: p.id,
        pic_url: p.avatar_file?.info.path,
      }))}
      baseUrl={marketPaths.mobileProviders}
    />
  );
}

export default ProvidersList;
