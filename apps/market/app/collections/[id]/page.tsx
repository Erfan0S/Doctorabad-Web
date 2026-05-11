import CollectionSinglePage from "@/components/layouts/mobile/CollectionSinglePage";
import { marketPaths } from "@repo/core/constants/routePath";
import { NextPageProps } from "@repo/core/types/general";
import { RedirectComponent } from "@repo/shared_modules/components";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import { notFound } from "next/navigation";
import React from "react";

function CollectionSingle({
  params,
  searchParams,
}: NextPageProps<{ id: string }>) {
  if (!params.id || isNaN(Number(params.id))) {
    return notFound();
  }

  return (
    <DiviceSwitchShell
      desktop={<RedirectComponent url={marketPaths.archive} />}
      mobile={<CollectionSinglePage id={Number(params.id)} />}
    />
  );
}

export default CollectionSingle;
