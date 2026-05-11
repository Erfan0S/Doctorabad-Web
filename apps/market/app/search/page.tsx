import { FilterParams } from "@/constants/filter";
import { marketPaths } from "@repo/core/constants/routePath";
import { NextPageProps } from "@repo/core/types/general";
import { RedirectComponent } from "@repo/shared_modules/components";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import React from "react";

function SearchPage({ searchParams }: NextPageProps) {
  const search = searchParams?.[FilterParams.SEARCH];

  return (
    <DiviceSwitchShell
      desktop={
        <RedirectComponent
          url={`${marketPaths.search}?${FilterParams.SEARCH}=${search}`}
        />
      }
      mobile={null}
    />
  );
}

export default SearchPage;
