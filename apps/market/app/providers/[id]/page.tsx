import React from "react";
import { NextPageProps } from "@repo/core/types/general";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import { RedirectComponent } from "@repo/shared_modules/components";
import MobileProviderPage from "@/components/layouts/mobile/ProvidersSinglePage";
import { notFound } from "next/navigation";
import { marketPaths } from "@repo/core/constants/routePath";
import { FilterParams } from "@/constants/filter";

function ProviderPage({ params, searchParams }: NextPageProps<{ id: string }>) {
  if (!params.id) {
    return notFound();
  }
  return (
    <DiviceSwitchShell
      desktop={
        <RedirectComponent
          url={`${marketPaths.archive}?${FilterParams.Provider}=${params.id}`}
        />
      }
      mobile={<MobileProviderPage id={Number(params.id)} />}
    />
  );
}

export default ProviderPage;
